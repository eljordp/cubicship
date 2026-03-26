import { STATUS_COLORS, STATUS_LABELS } from '../../lib/constants'
import type { RefundStatus } from '../../lib/types'

interface StatusBadgeProps {
  status: RefundStatus
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}
