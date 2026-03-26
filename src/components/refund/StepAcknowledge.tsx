import { User, Package, Calendar, FileText, UserCheck, Phone, RefreshCw } from 'lucide-react'
import { APPROVAL_TIMEFRAME } from '../../lib/constants'
import type { RefundFormData } from '../../lib/types'

interface StepAcknowledgeProps {
  data: RefundFormData
  acknowledged: boolean
  onAcknowledge: (value: boolean) => void
}

function formatResendOutcome(outcome: string): string {
  switch (outcome) {
    case 'customer_declined':
      return 'Customer declined the resend'
    case 'not_possible':
      return 'Resend was not possible'
    default:
      return 'N/A'
  }
}

export default function StepAcknowledge({ data, acknowledged, onAcknowledge }: StepAcknowledgeProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl text-navy mb-1">Review & Submit</h3>
        <p className="text-text-secondary text-sm">Please verify your information before submitting.</p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
        <div className="flex items-start gap-3">
          <User className="w-4 h-4 text-text-secondary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-text-secondary uppercase tracking-wide font-medium">Name</p>
            <p className="text-navy font-medium">{data.customer_name}</p>
          </div>
        </div>

        <hr className="border-border" />

        <div className="flex items-start gap-3">
          <Package className="w-4 h-4 text-text-secondary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-text-secondary uppercase tracking-wide font-medium">Email</p>
            <p className="text-navy font-medium">{data.customer_email}</p>
          </div>
        </div>

        <hr className="border-border" />

        <div className="flex items-start gap-3">
          <Package className="w-4 h-4 text-text-secondary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-text-secondary uppercase tracking-wide font-medium">Tracking Number</p>
            <p className="text-navy font-medium">{data.tracking_number}</p>
          </div>
        </div>

        <hr className="border-border" />

        <div className="flex items-start gap-3">
          <Calendar className="w-4 h-4 text-text-secondary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-text-secondary uppercase tracking-wide font-medium">Shipment Date</p>
            <p className="text-navy font-medium">{data.shipment_date}</p>
          </div>
        </div>

        <hr className="border-border" />

        <div className="flex items-start gap-3">
          <FileText className="w-4 h-4 text-text-secondary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-text-secondary uppercase tracking-wide font-medium">Reason</p>
            <p className="text-navy text-sm leading-relaxed">{data.return_reason}</p>
          </div>
        </div>

        <hr className="border-border" />

        <div className="flex items-start gap-3">
          <UserCheck className="w-4 h-4 text-text-secondary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-text-secondary uppercase tracking-wide font-medium">Agent</p>
            <p className="text-navy font-medium">{data.agent_name}</p>
          </div>
        </div>

        <hr className="border-border" />

        <div className="flex items-start gap-3">
          <Phone className="w-4 h-4 text-text-secondary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-text-secondary uppercase tracking-wide font-medium">Customer Contacted</p>
            <p className="text-navy font-medium">{data.customer_contacted ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <hr className="border-border" />

        <div className="flex items-start gap-3">
          <RefreshCw className="w-4 h-4 text-text-secondary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-text-secondary uppercase tracking-wide font-medium">Resend Attempted</p>
            <p className="text-navy font-medium">{data.resend_attempted ? 'Yes' : 'No'}</p>
          </div>
        </div>

        {data.resend_attempted && data.resend_outcome && (
          <>
            <hr className="border-border" />
            <div className="flex items-start gap-3">
              <RefreshCw className="w-4 h-4 text-text-secondary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-text-secondary uppercase tracking-wide font-medium">Resend Outcome</p>
                <p className="text-navy font-medium">{formatResendOutcome(data.resend_outcome)}</p>
              </div>
            </div>
          </>
        )}
      </div>

      <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border border-border bg-white hover:border-primary/30 transition-colors">
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={(e) => onAcknowledge(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-border text-primary accent-primary"
        />
        <span className="text-sm text-text leading-relaxed">
          I understand that it takes <strong>{APPROVAL_TIMEFRAME}</strong> for my refund request to be reviewed
          and approved. I will be contacted at the email address provided with updates on my request.
        </span>
      </label>
    </div>
  )
}
