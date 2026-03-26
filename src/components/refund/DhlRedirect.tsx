import { AlertTriangle, ExternalLink } from 'lucide-react'
import { DHL_CLAIM_URL } from '../../lib/constants'

export default function DhlRedirect() {
  return (
    <div className="mt-6 rounded-xl border border-dhl-red/20 bg-dhl-red/5 p-6">
      <div className="flex gap-3">
        <AlertTriangle className="w-6 h-6 text-dhl-red flex-shrink-0 mt-0.5" />
        <div className="space-y-3">
          <h4 className="font-semibold text-navy text-lg">
            Refund cannot be processed
          </h4>
          <p className="text-text-secondary text-sm leading-relaxed">
            Unfortunately, we cannot process a refund for shipments that have left the
            United States. You will need to file a claim directly with DHL.
          </p>
          <a
            href={DHL_CLAIM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
              bg-dhl-red text-white text-sm font-medium
              hover:bg-dhl-red/90 transition-colors
            "
          >
            File a Claim with DHL
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
