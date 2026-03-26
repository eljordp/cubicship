import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Package } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useRefundRequests } from '../hooks/useRefundRequests'
import type { RefundStatus } from '../lib/types'
import RequestCard from '../components/admin/RequestCard'
import RequestDetail from '../components/admin/RequestDetail'

const FILTER_TABS: { key: RefundStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'denied', label: 'Denied' },
]

export default function AdminDashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth()
  const navigate = useNavigate()
  const { requests, loading, error, filter, setFilter, counts, approveRequest, denyRequest } =
    useRefundRequests()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin')
    }
  }, [user, authLoading, navigate])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
        <p className="text-[var(--color-text-secondary)]">Loading...</p>
      </div>
    )
  }

  if (!user) return null

  const selectedRequest = requests.find((r) => r.id === selectedId) ?? null

  const handleApprove = async (
    id: string,
    notes: string,
    checklist: {
      checklist_reason_documented: boolean
      checklist_agent_contacted_cr: boolean
      checklist_agent_documented_issue: boolean
      checklist_shipment_in_us: boolean
    }
  ) => {
    await approveRequest(id, notes, checklist, user.email ?? 'unknown')
  }

  const handleDeny = async (id: string, notes: string) => {
    await denyRequest(id, notes, user.email ?? 'unknown')
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      {/* Header */}
      <header className="bg-white border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-[var(--color-navy)]">
              Admin Dashboard
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
              Refund request management
            </p>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-navy)] transition-colors rounded-lg hover:bg-gray-100"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {FILTER_TABS.map(({ key, label }) => {
            const count = counts[key]
            const active = filter === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setFilter(key)
                  setSelectedId(null)
                }}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-[var(--color-navy)] text-white'
                    : 'bg-white text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-gray-300'
                }`}
              >
                {label}
                <span
                  className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold rounded-full ${
                    active
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-[var(--color-text-secondary)]'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-sm text-red-600 bg-red-50 rounded-lg p-4 border border-red-200 mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <p className="text-[var(--color-text-secondary)]">Loading requests...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && requests.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Package className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-lg font-medium text-[var(--color-navy)] mb-1">
              No requests found
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {filter === 'all'
                ? 'No refund requests have been submitted yet.'
                : `No ${filter} requests at the moment.`}
            </p>
          </div>
        )}

        {/* Content */}
        {!loading && requests.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Request List */}
            <div className="lg:col-span-2 space-y-3">
              {requests.map((req) => (
                <RequestCard
                  key={req.id}
                  request={req}
                  selected={selectedId === req.id}
                  onClick={() => setSelectedId(req.id)}
                />
              ))}
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-3">
              {selectedRequest ? (
                <RequestDetail
                  key={selectedRequest.id}
                  request={selectedRequest}
                  onApprove={handleApprove}
                  onDeny={handleDeny}
                />
              ) : (
                <div className="bg-white rounded-xl border border-[var(--color-border)] flex flex-col items-center justify-center py-20 text-center">
                  <Package className="w-10 h-10 text-gray-300 mb-3" />
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Select a request to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
