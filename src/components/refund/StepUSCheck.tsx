import { Globe, MapPin } from 'lucide-react'
import type { RefundFormData } from '../../lib/types'
import DhlRedirect from './DhlRedirect'

interface StepUSCheckProps {
  data: RefundFormData
  onChange: (field: keyof RefundFormData, value: boolean) => void
  leftUsSelected: boolean | null
}

export default function StepUSCheck({ onChange, leftUsSelected }: StepUSCheckProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl text-navy mb-1">Shipment Verification</h3>
        <p className="text-text-secondary text-sm">
          We need to verify whether your shipment left the country before we can proceed.
        </p>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => onChange('left_us', true)}
          className={`
            w-full flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all
            ${leftUsSelected === true
              ? 'border-dhl-red bg-dhl-red/5'
              : 'border-border bg-white hover:border-text-secondary/30'
            }
          `}
        >
          <div className={`
            w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
            ${leftUsSelected === true ? 'bg-dhl-red/10' : 'bg-surface'}
          `}>
            <Globe className={`w-5 h-5 ${leftUsSelected === true ? 'text-dhl-red' : 'text-text-secondary'}`} />
          </div>
          <div>
            <p className="font-medium text-navy">Yes, it left the US</p>
            <p className="text-text-secondary text-sm mt-0.5">The shipment has departed the United States</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChange('left_us', false)}
          className={`
            w-full flex items-center gap-4 p-5 rounded-xl border-2 text-left transition-all
            ${leftUsSelected === false
              ? 'border-green bg-green/5'
              : 'border-border bg-white hover:border-text-secondary/30'
            }
          `}
        >
          <div className={`
            w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
            ${leftUsSelected === false ? 'bg-green/10' : 'bg-surface'}
          `}>
            <MapPin className={`w-5 h-5 ${leftUsSelected === false ? 'text-green' : 'text-text-secondary'}`} />
          </div>
          <div>
            <p className="font-medium text-navy">No, it stayed in the US</p>
            <p className="text-text-secondary text-sm mt-0.5">The shipment remained within the United States</p>
          </div>
        </button>
      </div>

      {leftUsSelected === true && <DhlRedirect />}
    </div>
  )
}
