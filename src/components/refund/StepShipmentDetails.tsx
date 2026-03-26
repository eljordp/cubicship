import { Package, Calendar, FileText } from 'lucide-react'
import type { RefundFormData } from '../../lib/types'

interface StepShipmentDetailsProps {
  data: RefundFormData
  onChange: (field: keyof RefundFormData, value: string) => void
  errors: Record<string, string>
}

export default function StepShipmentDetails({ data, onChange, errors }: StepShipmentDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl text-navy mb-1">Shipment Details</h3>
        <p className="text-text-secondary text-sm">Provide the details of the shipment you'd like refunded.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="tracking_number" className="block text-sm font-medium text-text mb-1.5">
            Tracking Number
          </label>
          <div className="relative">
            <Package className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              id="tracking_number"
              type="text"
              value={data.tracking_number}
              onChange={(e) => onChange('tracking_number', e.target.value)}
              placeholder="1234567890"
              className={`
                w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-text
                placeholder:text-text-secondary/50 outline-none transition-all
                focus:border-primary focus:ring-2 focus:ring-primary/10
                ${errors.tracking_number ? 'border-error' : 'border-border'}
              `}
            />
          </div>
          {errors.tracking_number && (
            <p className="text-error text-xs mt-1.5">{errors.tracking_number}</p>
          )}
        </div>

        <div>
          <label htmlFor="shipment_date" className="block text-sm font-medium text-text mb-1.5">
            Shipment Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              id="shipment_date"
              type="date"
              value={data.shipment_date}
              onChange={(e) => onChange('shipment_date', e.target.value)}
              className={`
                w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-text
                outline-none transition-all
                focus:border-primary focus:ring-2 focus:ring-primary/10
                ${errors.shipment_date ? 'border-error' : 'border-border'}
              `}
            />
          </div>
          {errors.shipment_date && (
            <p className="text-error text-xs mt-1.5">{errors.shipment_date}</p>
          )}
        </div>

        <div>
          <label htmlFor="return_reason" className="block text-sm font-medium text-text mb-1.5">
            Reason for Refund
          </label>
          <div className="relative">
            <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-text-secondary" />
            <textarea
              id="return_reason"
              value={data.return_reason}
              onChange={(e) => onChange('return_reason', e.target.value)}
              placeholder="Please describe why you are requesting a refund..."
              rows={4}
              className={`
                w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-text
                placeholder:text-text-secondary/50 outline-none transition-all resize-none
                focus:border-primary focus:ring-2 focus:ring-primary/10
                ${errors.return_reason ? 'border-error' : 'border-border'}
              `}
            />
          </div>
          {errors.return_reason && (
            <p className="text-error text-xs mt-1.5">{errors.return_reason}</p>
          )}
        </div>
      </div>
    </div>
  )
}
