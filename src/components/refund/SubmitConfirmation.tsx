import { CheckCircle } from 'lucide-react'
import { APPROVAL_TIMEFRAME } from '../../lib/constants'

interface SubmitConfirmationProps {
  email: string
}

export default function SubmitConfirmation({ email }: SubmitConfirmationProps) {
  return (
    <div className="text-center py-8 space-y-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green/10">
        <CheckCircle className="w-8 h-8 text-green" />
      </div>

      <div className="space-y-2">
        <h3 className="font-serif text-3xl text-navy">Request Submitted</h3>
        <p className="text-text-secondary leading-relaxed max-w-md mx-auto">
          Your refund request has been received and is now under review.
          Please allow <strong>{APPROVAL_TIMEFRAME}</strong> for processing.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4 max-w-sm mx-auto">
        <p className="text-sm text-text-secondary">
          We will contact you at
        </p>
        <p className="text-navy font-medium mt-1">{email}</p>
        <p className="text-sm text-text-secondary mt-1">
          with updates on your request.
        </p>
      </div>

      <div className="pt-2">
        <a
          href="/"
          className="
            inline-flex items-center gap-2 px-6 py-3 rounded-xl
            bg-navy text-white text-sm font-medium
            hover:bg-navy-light transition-colors
          "
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}
