import { UserCheck, Phone, RefreshCw } from 'lucide-react'
import type { RefundFormData } from '../../lib/types'

interface StepAgentInfoProps {
  data: RefundFormData
  onChange: (field: keyof RefundFormData, value: string | boolean) => void
  errors: Record<string, string>
}

export default function StepAgentInfo({ data, onChange, errors }: StepAgentInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl text-navy mb-1">Agent & Resend Info</h3>
        <p className="text-text-secondary text-sm">
          Before submitting a refund, the agent must have contacted the customer and attempted a resend.
        </p>
      </div>

      <div className="space-y-5">
        {/* Agent Name */}
        <div>
          <label htmlFor="agent_name" className="block text-sm font-medium text-text mb-1.5">
            Which agent handled this case?
          </label>
          <div className="relative">
            <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              id="agent_name"
              type="text"
              value={data.agent_name}
              onChange={(e) => onChange('agent_name', e.target.value)}
              placeholder="Agent name"
              className={`
                w-full pl-11 pr-4 py-3 rounded-xl border bg-white text-text
                placeholder:text-text-secondary/50 outline-none transition-all
                focus:border-primary focus:ring-2 focus:ring-primary/10
                ${errors.agent_name ? 'border-error' : 'border-border'}
              `}
            />
          </div>
          {errors.agent_name && (
            <p className="text-error text-xs mt-1.5">{errors.agent_name}</p>
          )}
        </div>

        {/* Customer Contacted */}
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Was the customer contacted and apologized to?
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => onChange('customer_contacted', true)}
              className={`
                flex-1 flex items-center justify-center gap-2 p-3.5 rounded-xl border-2 text-sm font-medium transition-all
                ${data.customer_contacted === true && errors.customer_contacted === undefined
                  ? 'border-green bg-green/5 text-green'
                  : 'border-border bg-white text-text-secondary hover:border-text-secondary/30'
                }
              `}
            >
              <Phone className="w-4 h-4" />
              Yes, contacted
            </button>
            <button
              type="button"
              onClick={() => onChange('customer_contacted', false)}
              className={`
                flex-1 flex items-center justify-center gap-2 p-3.5 rounded-xl border-2 text-sm font-medium transition-all
                ${data.customer_contacted === false
                  ? 'border-dhl-red bg-dhl-red/5 text-dhl-red'
                  : 'border-border bg-white text-text-secondary hover:border-text-secondary/30'
                }
              `}
            >
              No
            </button>
          </div>
          {errors.customer_contacted && (
            <p className="text-error text-xs mt-1.5">{errors.customer_contacted}</p>
          )}
        </div>

        {/* Resend Attempted */}
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Was a resend attempted?
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => onChange('resend_attempted', true)}
              className={`
                flex-1 flex items-center justify-center gap-2 p-3.5 rounded-xl border-2 text-sm font-medium transition-all
                ${data.resend_attempted === true
                  ? 'border-green bg-green/5 text-green'
                  : 'border-border bg-white text-text-secondary hover:border-text-secondary/30'
                }
              `}
            >
              <RefreshCw className="w-4 h-4" />
              Yes, attempted
            </button>
            <button
              type="button"
              onClick={() => onChange('resend_attempted', false)}
              className={`
                flex-1 flex items-center justify-center gap-2 p-3.5 rounded-xl border-2 text-sm font-medium transition-all
                ${data.resend_attempted === false
                  ? 'border-dhl-red bg-dhl-red/5 text-dhl-red'
                  : 'border-border bg-white text-text-secondary hover:border-text-secondary/30'
                }
              `}
            >
              No
            </button>
          </div>
          {errors.resend_attempted && (
            <p className="text-error text-xs mt-1.5">{errors.resend_attempted}</p>
          )}
        </div>

        {/* Resend Outcome - only show if resend was attempted */}
        {data.resend_attempted && (
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Why wasn't the resend completed?
            </label>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onChange('resend_outcome', 'customer_declined')}
                className={`
                  w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left text-sm transition-all
                  ${data.resend_outcome === 'customer_declined'
                    ? 'border-primary bg-primary/5 text-navy font-medium'
                    : 'border-border bg-white text-text-secondary hover:border-text-secondary/30'
                  }
                `}
              >
                <div className={`
                  w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0
                  ${data.resend_outcome === 'customer_declined' ? 'border-primary' : 'border-border'}
                `}>
                  {data.resend_outcome === 'customer_declined' && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
                Customer declined the resend
              </button>
              <button
                type="button"
                onClick={() => onChange('resend_outcome', 'not_possible')}
                className={`
                  w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left text-sm transition-all
                  ${data.resend_outcome === 'not_possible'
                    ? 'border-primary bg-primary/5 text-navy font-medium'
                    : 'border-border bg-white text-text-secondary hover:border-text-secondary/30'
                  }
                `}
              >
                <div className={`
                  w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0
                  ${data.resend_outcome === 'not_possible' ? 'border-primary' : 'border-border'}
                `}>
                  {data.resend_outcome === 'not_possible' && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
                Resend was not possible (address issue, item unavailable, etc.)
              </button>
            </div>
            {errors.resend_outcome && (
              <p className="text-error text-xs mt-1.5">{errors.resend_outcome}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
