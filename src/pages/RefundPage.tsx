import RefundForm from '../components/refund/RefundForm'

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="w-full max-w-2xl mx-auto px-5 py-16 sm:py-24">
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy tracking-tight">Refund Request</h1>
          <p className="text-text-secondary mt-3 text-lg leading-relaxed max-w-lg">
            Complete the form below to submit a refund request. We will review your
            submission and follow up within 48 to 72 hours.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-sm p-6 sm:p-10">
          <RefundForm />
        </div>
      </div>
    </div>
  )
}
