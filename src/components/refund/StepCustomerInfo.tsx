import { User, Mail, Phone } from 'lucide-react'
import type { RefundFormData } from '../../lib/types'

interface StepCustomerInfoProps {
  data: RefundFormData
  onChange: (field: keyof RefundFormData, value: string) => void
  errors: Record<string, string>
}

export default function StepCustomerInfo({ data, onChange, errors }: StepCustomerInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl text-navy mb-1">Your Information</h3>
        <p className="text-text-secondary text-sm">Tell us who you are so we can process your request.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="customer_name" className="block text-sm font-medium text-text mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              id="customer_name"
              type="text"
              value={data.customer_name}
              onChange={(e) => onChange('customer_name', e.target.value)}
              placeholder="John Doe"
              className={`
                w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-text
                placeholder:text-text-secondary/50 outline-none transition-all
                focus:border-primary focus:ring-2 focus:ring-primary/10
                ${errors.customer_name ? 'border-error' : 'border-border'}
              `}
            />
          </div>
          {errors.customer_name && (
            <p className="text-error text-xs mt-1.5">{errors.customer_name}</p>
          )}
        </div>

        <div>
          <label htmlFor="customer_email" className="block text-sm font-medium text-text mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              id="customer_email"
              type="email"
              value={data.customer_email}
              onChange={(e) => onChange('customer_email', e.target.value)}
              placeholder="john@example.com"
              className={`
                w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-text
                placeholder:text-text-secondary/50 outline-none transition-all
                focus:border-primary focus:ring-2 focus:ring-primary/10
                ${errors.customer_email ? 'border-error' : 'border-border'}
              `}
            />
          </div>
          {errors.customer_email && (
            <p className="text-error text-xs mt-1.5">{errors.customer_email}</p>
          )}
        </div>

        <div>
          <label htmlFor="customer_phone" className="block text-sm font-medium text-text mb-1.5">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              id="customer_phone"
              type="tel"
              value={data.customer_phone}
              onChange={(e) => onChange('customer_phone', e.target.value)}
              placeholder="(555) 123-4567"
              className={`
                w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-text
                placeholder:text-text-secondary/50 outline-none transition-all
                focus:border-primary focus:ring-2 focus:ring-primary/10
                ${errors.customer_phone ? 'border-error' : 'border-border'}
              `}
            />
          </div>
          {errors.customer_phone && (
            <p className="text-error text-xs mt-1.5">{errors.customer_phone}</p>
          )}
        </div>
      </div>
    </div>
  )
}
