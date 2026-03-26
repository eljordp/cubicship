import { CheckCircle } from 'lucide-react'

const steps = [
  { number: 1, label: 'Your Info' },
  { number: 2, label: 'Shipment Details' },
  { number: 3, label: 'Verification' },
  { number: 4, label: 'Review & Submit' },
]

interface FormProgressBarProps {
  currentStep: number
}

export default function FormProgressBar({ currentStep }: FormProgressBarProps) {
  return (
    <div className="flex items-center justify-between w-full mb-10">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.number
        const isCurrent = currentStep === step.number
        const isUpcoming = currentStep < step.number

        return (
          <div key={step.number} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                  ${isCompleted ? 'bg-green text-white' : ''}
                  ${isCurrent ? 'bg-primary text-white shadow-lg shadow-primary/30' : ''}
                  ${isUpcoming ? 'bg-border text-text-secondary' : ''}
                `}
              >
                {isCompleted ? <CheckCircle className="w-5 h-5" /> : step.number}
              </div>
              <span
                className={`
                  mt-2 text-xs font-medium whitespace-nowrap
                  ${isCurrent ? 'text-primary' : ''}
                  ${isCompleted ? 'text-green' : ''}
                  ${isUpcoming ? 'text-text-secondary' : ''}
                `}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 mx-3 mt-[-1.25rem]">
                <div
                  className={`
                    h-0.5 w-full transition-all duration-300
                    ${isCompleted ? 'bg-green' : 'bg-border'}
                  `}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
