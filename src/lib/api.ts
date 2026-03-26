import type { RefundFormData, RefundRequest } from './types'

const API_BASE = '/api'

export async function createRefundRequest(data: RefundFormData): Promise<RefundRequest> {
  const res = await fetch(`${API_BASE}/refunds`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function fetchRefundRequests(status?: string): Promise<RefundRequest[]> {
  const url = status ? `${API_BASE}/refunds?status=${status}` : `${API_BASE}/refunds`
  const res = await fetch(url, { headers: authHeaders() })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function fetchRefundRequest(id: string): Promise<RefundRequest> {
  const res = await fetch(`${API_BASE}/refunds/${id}`, { headers: authHeaders() })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function updateRefundRequest(id: string, data: Record<string, unknown>): Promise<RefundRequest> {
  const res = await fetch(`${API_BASE}/refunds/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function login(password: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  if (!res.ok) throw new Error('Invalid password')
  const { token } = await res.json()
  localStorage.setItem('admin_token', token)
  return true
}

export function logout(): void {
  localStorage.removeItem('admin_token')
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem('admin_token')
}

export async function checkAuth(): Promise<boolean> {
  const token = localStorage.getItem('admin_token')
  if (!token) return false

  try {
    const res = await fetch(`${API_BASE}/auth/check`, {
      headers: authHeaders(),
    })
    if (!res.ok) return false
    const { authenticated } = await res.json()
    return authenticated
  } catch {
    return false
  }
}

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem('admin_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}
