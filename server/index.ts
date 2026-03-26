import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import db from './db.js'
import { sendNewRefundNotification, sendRefundStatusEmail } from './email.js'

const app = express()
const PORT = parseInt(process.env.PORT || '3001')

// --- Auth config ---
interface AuthConfig {
  admin_password: string
  session_secret: string
}

function loadAuthConfig(): AuthConfig {
  const configPath = path.join(process.cwd(), 'config', 'auth.json')
  if (!fs.existsSync(configPath)) {
    console.warn('No config/auth.json found — using defaults (CHANGE IN PRODUCTION)')
    return {
      admin_password: 'changeme',
      session_secret: 'default-secret-change-me',
    }
  }
  const raw = fs.readFileSync(configPath, 'utf-8')
  return JSON.parse(raw)
}

const authConfig = loadAuthConfig()

// In-memory session tokens
const activeSessions = new Map<string, { createdAt: number }>()

// Session cleanup — remove tokens older than 24 hours
setInterval(() => {
  const now = Date.now()
  for (const [token, session] of activeSessions) {
    if (now - session.createdAt > 24 * 60 * 60 * 1000) {
      activeSessions.delete(token)
    }
  }
}, 60 * 60 * 1000)

// Auth middleware
function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const token = authHeader.slice(7)
  if (!activeSessions.has(token)) {
    res.status(401).json({ error: 'Invalid or expired session' })
    return
  }

  next()
}

// Middleware
app.use(cors())
app.use(express.json())

// --- Auth Routes ---

app.post('/api/auth/login', (req, res) => {
  const { password } = req.body

  if (!password || password !== authConfig.admin_password) {
    res.status(401).json({ error: 'Invalid password' })
    return
  }

  const token = crypto.randomBytes(32).toString('hex')
  activeSessions.set(token, { createdAt: Date.now() })

  res.json({ token })
})

app.get('/api/auth/check', (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.json({ authenticated: false })
    return
  }

  const token = authHeader.slice(7)
  res.json({ authenticated: activeSessions.has(token) })
})

// --- Refund Routes ---

// POST /api/refunds — create new refund request
app.post('/api/refunds', async (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      tracking_number,
      shipment_date,
      return_reason,
      left_us,
      agent_name,
      customer_contacted,
    } = req.body

    // Validate required fields
    if (
      !customer_name ||
      !customer_email ||
      !customer_phone ||
      !tracking_number ||
      !shipment_date ||
      !return_reason
    ) {
      res.status(400).json({ error: 'Missing required fields' })
      return
    }

    const id = uuidv4()

    db.prepare(
      `INSERT INTO refund_requests (id, customer_name, customer_email, customer_phone, tracking_number, shipment_date, return_reason, left_us, agent_name, customer_contacted)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      id,
      customer_name,
      customer_email,
      customer_phone,
      tracking_number,
      shipment_date,
      return_reason,
      left_us ? 1 : 0,
      agent_name || '',
      customer_contacted ? 1 : 0
    )

    const newRefund = db.prepare(`SELECT * FROM refund_requests WHERE id = ?`).get(id)

    // Send email notification (non-blocking)
    sendNewRefundNotification({
      id,
      tracking_number,
      customer_name,
      return_reason,
    }).catch((err) => console.error('Failed to send new refund email:', err))

    res.status(201).json(newRefund)
  } catch (err) {
    console.error('Error creating refund request:', err)
    res.status(500).json({ error: 'Failed to create refund request' })
  }
})

// GET /api/refunds — list all refund requests, optional ?status= filter
app.get('/api/refunds', requireAuth, (req, res) => {
  try {
    const { status } = req.query

    let rows
    if (status && typeof status === 'string') {
      rows = db
        .prepare(`SELECT * FROM refund_requests WHERE status = ? ORDER BY created_at DESC`)
        .all(status)
    } else {
      rows = db
        .prepare(`SELECT * FROM refund_requests ORDER BY created_at DESC`)
        .all()
    }

    res.json(rows)
  } catch (err) {
    console.error('Error fetching refund requests:', err)
    res.status(500).json({ error: 'Failed to fetch refund requests' })
  }
})

// GET /api/refunds/:id — get single refund request
app.get('/api/refunds/:id', requireAuth, (req, res) => {
  try {
    const row = db.prepare(`SELECT * FROM refund_requests WHERE id = ?`).get(req.params.id)

    if (!row) {
      res.status(404).json({ error: 'Refund request not found' })
      return
    }

    res.json(row)
  } catch (err) {
    console.error('Error fetching refund request:', err)
    res.status(500).json({ error: 'Failed to fetch refund request' })
  }
})

// PATCH /api/refunds/:id — update refund request
app.patch('/api/refunds/:id', requireAuth, async (req, res) => {
  try {
    const existing = db
      .prepare(`SELECT * FROM refund_requests WHERE id = ?`)
      .get(req.params.id) as Record<string, unknown> | undefined

    if (!existing) {
      res.status(404).json({ error: 'Refund request not found' })
      return
    }

    const allowedFields = [
      'customer_name',
      'customer_email',
      'customer_phone',
      'tracking_number',
      'shipment_date',
      'return_reason',
      'left_us',
      'agent_name',
      'customer_contacted',
      'status',
      'admin_notes',
      'checklist_reason_documented',
      'checklist_agent_contacted_cr',
      'checklist_agent_documented_issue',
      'checklist_shipment_in_us',
      'reviewed_by',
      'reviewed_at',
    ]

    const updates: string[] = []
    const values: unknown[] = []

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates.push(`${field} = ?`)
        // Convert booleans to integers for SQLite
        const val = req.body[field]
        if (typeof val === 'boolean') {
          values.push(val ? 1 : 0)
        } else {
          values.push(val)
        }
      }
    }

    if (updates.length === 0) {
      res.status(400).json({ error: 'No valid fields to update' })
      return
    }

    // Always update updated_at
    updates.push(`updated_at = datetime('now')`)
    values.push(req.params.id)

    db.prepare(
      `UPDATE refund_requests SET ${updates.join(', ')} WHERE id = ?`
    ).run(...values)

    const updated = db
      .prepare(`SELECT * FROM refund_requests WHERE id = ?`)
      .get(req.params.id)

    // Send status update email if status changed
    const oldStatus = existing.status as string
    const newStatus = req.body.status as string | undefined
    if (newStatus && newStatus !== oldStatus) {
      sendRefundStatusEmail({
        customer_email: (updated as Record<string, unknown>).customer_email as string,
        customer_name: (updated as Record<string, unknown>).customer_name as string,
        tracking_number: (updated as Record<string, unknown>).tracking_number as string,
        status: newStatus,
        admin_notes: req.body.admin_notes,
      }).catch((err) =>
        console.error('Failed to send status update email:', err)
      )
    }

    res.json(updated)
  } catch (err) {
    console.error('Error updating refund request:', err)
    res.status(500).json({ error: 'Failed to update refund request' })
  }
})

// --- Serve static frontend in production ---
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(process.cwd(), 'dist')
  app.use(express.static(distPath))

  // SPA fallback — serve index.html for all non-API routes
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

// Start server
app.listen(PORT, () => {
  console.log(`Cubic Ship API running on port ${PORT}`)
})
