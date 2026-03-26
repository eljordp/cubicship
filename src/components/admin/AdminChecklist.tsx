import { CheckSquare, Square } from 'lucide-react'

interface ChecklistState {
  checklist_reason_documented: boolean
  checklist_agent_contacted_cr: boolean
  checklist_agent_documented_issue: boolean
  checklist_shipment_in_us: boolean
}

interface AdminChecklistProps {
  checklist: ChecklistState
  onChange: (checklist: ChecklistState) => void
  disabled?: boolean
}

const CHECKLIST_ITEMS: { key: keyof ChecklistState; label: string }[] = [
  { key: 'checklist_reason_documented', label: 'Return reason has been documented' },
  { key: 'checklist_agent_contacted_cr', label: 'Agent contacted Customer Relations' },
  { key: 'checklist_agent_documented_issue', label: 'Agent documented what went wrong' },
  { key: 'checklist_shipment_in_us', label: 'Shipment did NOT leave the United States' },
]

export default function AdminChecklist({ checklist, onChange, disabled }: AdminChecklistProps) {
  const toggle = (key: keyof ChecklistState) => {
    if (disabled) return
    onChange({ ...checklist, [key]: !checklist[key] })
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-[var(--color-navy)] uppercase tracking-wide">
        Approval Checklist
      </p>
      {CHECKLIST_ITEMS.map(({ key, label }) => {
        const checked = checklist[key]
        return (
          <button
            key={key}
            type="button"
            onClick={() => toggle(key)}
            disabled={disabled}
            className={`flex items-start gap-3 w-full text-left p-3 rounded-lg border transition-colors ${
              checked
                ? 'border-green-200 bg-green-50'
                : 'border-[var(--color-border)] bg-white'
            } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:border-[var(--color-primary)]'}`}
          >
            {checked ? (
              <CheckSquare className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            ) : (
              <Square className="w-5 h-5 text-[var(--color-text-secondary)] shrink-0 mt-0.5" />
            )}
            <span className={`text-sm ${checked ? 'text-green-800' : 'text-[var(--color-text)]'}`}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
