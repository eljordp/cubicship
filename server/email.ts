import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

interface EmailConfig {
  host: string
  port: number
  secure?: boolean
  user: string
  pass: string
  from: string
  admin_email: string
  app_url: string
}

function loadEmailConfig(): EmailConfig {
  const configPath = path.join(process.cwd(), 'config', 'email.json')
  if (!fs.existsSync(configPath)) {
    console.warn('No config/email.json found — emails will be disabled')
    return {
      host: '',
      port: 587,
      user: '',
      pass: '',
      from: 'refunds@cubicship.com',
      admin_email: 'admin@cubicship.com',
      app_url: 'http://localhost:5173',
    }
  }
  const raw = fs.readFileSync(configPath, 'utf-8')
  return JSON.parse(raw)
}

const config = loadEmailConfig()

const transporter = config.host
  ? nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure ?? config.port === 465,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    })
  : nodemailer.createTransport({
      sendmail: true,
      newline: 'unix',
      path: '/usr/sbin/sendmail',
    })

export async function sendNewRefundNotification(data: {
  id: string
  tracking_number: string
  customer_name: string
  return_reason: string
}) {
  if (!config.admin_email) return

  const refundUrl = `${config.app_url}/admin/dashboard`

  try {
    await transporter.sendMail({
      from: config.from,
      to: config.admin_email,
      subject: `New Refund Request: ${data.tracking_number} - ${data.customer_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <div style="background: #0A1628; padding: 20px; text-align: center;">
            <h1 style="color: #F47621; margin: 0; font-size: 20px;">Cubic Ship Refunds</h1>
          </div>
          <div style="padding: 24px; background: #fff; border: 1px solid #E5E7EB;">
            <h2 style="color: #0A1628; margin-top: 0;">New Refund Request</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #6B7280; width: 140px;">Tracking #</td><td style="padding: 8px 0; font-weight: 600;">${data.tracking_number}</td></tr>
              <tr><td style="padding: 8px 0; color: #6B7280;">Customer</td><td style="padding: 8px 0; font-weight: 600;">${data.customer_name}</td></tr>
              <tr><td style="padding: 8px 0; color: #6B7280;">Reason</td><td style="padding: 8px 0;">${data.return_reason}</td></tr>
            </table>
            <div style="margin-top: 24px;">
              <a href="${refundUrl}" style="display: inline-block; background: #F47621; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">View in Dashboard</a>
            </div>
          </div>
          <div style="padding: 12px 24px; background: #F5F5F5; text-align: center; color: #6B7280; font-size: 12px;">
            Cubic Ship Refund Portal
          </div>
        </div>
      `,
    })
    console.log(`Email sent to ${config.admin_email} for refund ${data.tracking_number}`)
  } catch (err) {
    console.error('Failed to send new refund email:', err)
  }
}

export async function sendRefundStatusEmail(data: {
  customer_email: string
  customer_name: string
  tracking_number: string
  status: string
  admin_notes?: string
}) {
  const statusLabels: Record<string, string> = {
    approved: 'Refund Approved',
    denied: 'Refund Denied',
  }

  try {
    await transporter.sendMail({
      from: config.from,
      to: data.customer_email,
      subject: `Refund Update: ${data.tracking_number} - ${statusLabels[data.status] || data.status}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <div style="background: #0A1628; padding: 20px; text-align: center;">
            <h1 style="color: #F47621; margin: 0; font-size: 20px;">Cubic Ship</h1>
          </div>
          <div style="padding: 24px; background: #fff; border: 1px solid #E5E7EB;">
            <p>Dear ${data.customer_name},</p>
            <p>Your refund request for tracking number <strong>${data.tracking_number}</strong> has been updated.</p>
            <div style="background: #F5F5F5; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p style="margin: 0; color: #6B7280; font-size: 12px; text-transform: uppercase;">Status</p>
              <p style="margin: 4px 0 0; font-size: 18px; font-weight: 700; color: #0A1628;">${statusLabels[data.status] || data.status}</p>
            </div>
            ${data.admin_notes ? `<p><strong>Notes:</strong> ${data.admin_notes}</p>` : ''}
            <p style="color: #6B7280; font-size: 14px; margin-top: 20px;">If you have questions, contact us at info@cubicship.com</p>
          </div>
        </div>
      `,
    })
    console.log(`Status update email sent to ${data.customer_email}`)
  } catch (err) {
    console.error('Failed to send status update email:', err)
  }
}
