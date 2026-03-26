export type RefundStatus = 'pending' | 'approved' | 'denied'

export interface RefundRequest {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  tracking_number: string
  shipment_date: string
  return_reason: string
  left_us: boolean
  agent_name: string
  resend_attempted: boolean
  resend_outcome: string
  customer_contacted: boolean
  status: RefundStatus
  admin_notes: string | null
  checklist_reason_documented: boolean
  checklist_agent_contacted_cr: boolean
  checklist_agent_documented_issue: boolean
  checklist_shipment_in_us: boolean
  reviewed_by: string | null
  reviewed_at: string | null
  created_at: string
  updated_at: string
}

export interface RefundFormData {
  customer_name: string
  customer_email: string
  customer_phone: string
  tracking_number: string
  shipment_date: string
  return_reason: string
  left_us: boolean
  agent_name: string
  resend_attempted: boolean
  resend_outcome: string
  customer_contacted: boolean
}
