import { useState } from 'react'
import { User, Package, Clock, FileText, AlertCircle, UserCheck } from 'lucide-react'
import type { RefundRequest } from '../../lib/types'
import AdminChecklist from './AdminChecklist'
import StatusBadge from './StatusBadge'

interface RequestDetailProps {
  request: RefundRequest
  onApprove: (
    id: string,
    notes: string,
    checklist: {
      checklist_reason_documented: boolean
      checklist_agent_contacted_cr: boolean
      checklist_agent_documented_issue: boolean
      checklist_shipment_in_us: boolean
    }
  ) => Promise<void>
  onDeny: (id: string, notes: string) => Promise<void>
}

export default function RequestDetail({ request, onApprove, onDeny }: RequestDetailProps) {
  const [notes, setNotes] = useState(request.admin_notes || '')
  const [checklist, setChecklist] = useState({
    checklist_reason_documented: request.checklist_reason_documented,
    checklist_agent_contacted_cr: request.checklist_agent_contacted_cr,
    checklist_agent_documented_issue: request.checklist_agent_documented_issue,
    checklist_shipment_in_us: request.checklist_shipment_in_us,
  })
  const [submitting, setSubmitting] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  const allChecked = Object.values(checklist).every(Boolean)
  const isReviewed = request.status !== 'pending'

  const handleApprove = async () => {
    setSubmitting(true)
    setActionError(null)
    try {
      await onApprove(request.id, notes, checklist)
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to approve')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeny = async () => {
    setSubmitting(true)
    setActionError(null)
    try {
      await onDeny(request.id, notes)
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to deny')
    } finally {
      setSubmitting(false)
    }
  }

  const submittedDate = new Date(request.created_at).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const shipmentDate = new Date(request.shipment_date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="bg-white rounded-xl border border-[var(--color-border)] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[var(--color-border)] bg-gray-50/50">
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-serif text-xl text-[var(--color-navy)]">
            Request Details
          </h2>
          <StatusBadge status={request.status} />
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Submitted {submittedDate}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Customer Info */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wide mb-3">
            <User className="w-4 h-4" />
            Customer Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-[var(--color-text-secondary)] mb-0.5">Name</p>
              <p className="text-sm font-medium">{request.customer_name}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-secondary)] mb-0.5">Email</p>
              <p className="text-sm font-medium">{request.customer_email}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-secondary)] mb-0.5">Phone</p>
              <p className="text-sm font-medium">{request.customer_phone}</p>
            </div>
          </div>
        </div>

        {/* Shipment Info */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wide mb-3">
            <Package className="w-4 h-4" />
            Shipment Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-[var(--color-text-secondary)] mb-0.5">Tracking Number</p>
              <p className="text-sm font-medium font-mono">{request.tracking_number}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-secondary)] mb-0.5">Shipment Date</p>
              <p className="text-sm font-medium">{shipmentDate}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-secondary)] mb-0.5">Left the US?</p>
              <p className={`text-sm font-medium ${request.left_us ? 'text-red-600' : 'text-green-600'}`}>
                {request.left_us ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        </div>

        {/* Return Reason */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wide mb-3">
            <FileText className="w-4 h-4" />
            Return Reason
          </h3>
          <p className="text-sm text-[var(--color-text)] bg-gray-50 rounded-lg p-4 border border-[var(--color-border)]">
            {request.return_reason}
          </p>
        </div>

        {/* Agent Workflow Info */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wide mb-3">
            <UserCheck className="w-4 h-4" />
            Agent Workflow
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-[var(--color-text-secondary)] mb-0.5">Agent Name</p>
              <p className="text-sm font-medium">{request.agent_name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--color-text-secondary)] mb-0.5">Customer Contacted</p>
              <p className={`text-sm font-medium ${request.customer_contacted ? 'text-green-600' : 'text-red-600'}`}>
                {request.customer_contacted ? 'Yes — apologized' : 'No'}
              </p>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <AdminChecklist
          checklist={checklist}
          onChange={setChecklist}
          disabled={isReviewed}
        />

        {/* Admin Notes */}
        <div>
          <label
            htmlFor="admin-notes"
            className="flex items-center gap-2 text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wide mb-3"
          >
            <AlertCircle className="w-4 h-4" />
            Admin Notes
          </label>
          <textarea
            id="admin-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={isReviewed}
            placeholder="Add notes about this request..."
            rows={3}
            className="w-full px-4 py-3 text-sm border border-[var(--color-border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] disabled:bg-gray-50 disabled:text-[var(--color-text-secondary)] resize-none"
          />
        </div>

        {/* Reviewed Info */}
        {isReviewed && request.reviewed_by && (
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] bg-gray-50 rounded-lg p-4 border border-[var(--color-border)]">
            <Clock className="w-4 h-4 shrink-0" />
            <span>
              Reviewed by <strong>{request.reviewed_by}</strong> on{' '}
              {request.reviewed_at
                ? new Date(request.reviewed_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })
                : 'unknown date'}
            </span>
          </div>
        )}

        {/* Error */}
        {actionError && (
          <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3 border border-red-200">
            {actionError}
          </div>
        )}

        {/* Action Buttons */}
        {!isReviewed && (
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleApprove}
              disabled={!allChecked || submitting}
              className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? 'Processing...' : 'Approve'}
            </button>
            <button
              type="button"
              onClick={handleDeny}
              disabled={submitting}
              className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? 'Processing...' : 'Deny'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
