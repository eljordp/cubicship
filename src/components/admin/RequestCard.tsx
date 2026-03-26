import { Clock, Package, User } from 'lucide-react'
import type { RefundRequest } from '../../lib/types'
import StatusBadge from './StatusBadge'

interface RequestCardProps {
  request: RefundRequest
  selected: boolean
  onClick: () => void
}

export default function RequestCard({ request, selected, onClick }: RequestCardProps) {
  const submittedDate = new Date(request.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left p-5 rounded-xl border transition-all ${
        selected
          ? 'border-[var(--color-primary)] bg-orange-50/50 shadow-sm'
          : 'border-[var(--color-border)] bg-white hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-[var(--color-text-secondary)] shrink-0" />
            <span className="font-semibold text-[var(--color-navy)] truncate">
              {request.customer_name}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-[var(--color-text-secondary)] shrink-0" />
            <span className="text-sm text-[var(--color-text-secondary)] font-mono truncate">
              {request.tracking_number}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[var(--color-text-secondary)] shrink-0" />
            <span className="text-sm text-[var(--color-text-secondary)]">
              {submittedDate}
            </span>
          </div>
        </div>
        <StatusBadge status={request.status} />
      </div>
    </button>
  )
}
