import { useState } from 'react'
import { ArrowLeft, ArrowRight, Send } from 'lucide-react'
import type { RefundFormData } from '../../lib/types'
import { supabase } from '../../lib/supabase'
import FormProgressBar from './FormProgressBar'
import StepCustomerInfo from './StepCustomerInfo'
import StepShipmentDetails from './StepShipmentDetails'
import StepUSCheck from './StepUSCheck'
import StepAcknowledge from './StepAcknowledge'
import SubmitConfirmation from './SubmitConfirmation'

const initialFormData: RefundFormData = {
  customer_name: '',
  customer_email: '',
  customer_phone: '',
  tracking_number: '',
  shipment_date: '',
  return_reason: '',
  left_us: false,
}

export default function RefundForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<RefundFormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [acknowledged, setAcknowledged] = useState(false)
  const [leftUsSelected, setLeftUsSelected] = useState<boolean | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const updateField = (field: keyof RefundFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field as string]
      return next
    })

    if (field === 'left_us') {
      setLeftUsSelected(value as boolean)
    }
  }

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.customer_name.trim()) newErrors.customer_name = 'Name is required'
    if (!formData.customer_email.trim()) {
      newErrors.customer_email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customer_email)) {
      newErrors.customer_email = 'Please enter a valid email address'
    }
    if (!formData.customer_phone.trim()) newErrors.customer_phone = 'Phone number is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!formData.tracking_number.trim()) newErrors.tracking_number = 'Tracking number is required'
    if (!formData.shipment_date) newErrors.shipment_date = 'Shipment date is required'
    if (!formData.return_reason.trim()) newErrors.return_reason = 'Please provide a reason for the refund'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return
    if (step === 2 && !validateStep2()) return
    if (step === 3 && leftUsSelected === null) return
    if (step === 3 && leftUsSelected === true) return
    setStep((s) => Math.min(s + 1, 4))
  }

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1))
  }

  const handleSubmit = async () => {
    if (!acknowledged || submitting) return
    setSubmitting(true)
    setSubmitError(null)

    try {
      const { error } = await supabase.from('refund_requests').insert({
        customer_name: formData.customer_name.trim(),
        customer_email: formData.customer_email.trim(),
        customer_phone: formData.customer_phone.trim(),
        tracking_number: formData.tracking_number.trim(),
        shipment_date: formData.shipment_date,
        return_reason: formData.return_reason.trim(),
        left_us: false,
      })

      if (error) throw error
      setSubmitted(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setSubmitError(message)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return <SubmitConfirmation email={formData.customer_email} />
  }

  const canProceedStep3 = leftUsSelected === false
  const canSubmit = acknowledged && !submitting

  return (
    <div>
      <FormProgressBar currentStep={step} />

      <div className="min-h-[340px]">
        {step === 1 && (
          <StepCustomerInfo data={formData} onChange={updateField} errors={errors} />
        )}
        {step === 2 && (
          <StepShipmentDetails data={formData} onChange={updateField} errors={errors} />
        )}
        {step === 3 && (
          <StepUSCheck data={formData} onChange={updateField} leftUsSelected={leftUsSelected} />
        )}
        {step === 4 && (
          <StepAcknowledge data={formData} acknowledged={acknowledged} onAcknowledge={setAcknowledged} />
        )}
      </div>

      {submitError && (
        <div className="mt-4 p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
          {submitError}
        </div>
      )}

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="
              inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
              text-sm font-medium text-text-secondary
              border border-border bg-white
              hover:bg-surface transition-colors
            "
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={step === 3 && !canProceedStep3}
            className="
              inline-flex items-center gap-2 px-6 py-2.5 rounded-xl
              text-sm font-medium text-white
              bg-primary hover:bg-primary-dark transition-colors
              disabled:opacity-40 disabled:cursor-not-allowed
            "
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="
              inline-flex items-center gap-2 px-6 py-2.5 rounded-xl
              text-sm font-medium text-white
              bg-primary hover:bg-primary-dark transition-colors
              disabled:opacity-40 disabled:cursor-not-allowed
            "
          >
            {submitting ? 'Submitting...' : 'Submit Request'}
            {!submitting && <Send className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  )
}
