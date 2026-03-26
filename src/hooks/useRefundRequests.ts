import { useCallback, useEffect, useState } from 'react'
import type { RefundRequest, RefundStatus } from '../lib/types'
import { fetchRefundRequests, updateRefundRequest } from '../lib/api'

interface ChecklistState {
  checklist_reason_documented: boolean
  checklist_agent_contacted_cr: boolean
  checklist_agent_documented_issue: boolean
  checklist_shipment_in_us: boolean
}

export function useRefundRequests() {
  const [requests, setRequests] = useState<RefundRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<RefundStatus | 'all'>('all')

  const fetchRequests = useCallback(async (statusFilter?: RefundStatus | 'all') => {
    setLoading(true)
    setError(null)

    const activeFilter = statusFilter ?? filter

    try {
      const data = await fetchRefundRequests(
        activeFilter !== 'all' ? activeFilter : undefined
      )
      setRequests(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch requests'
      setError(message)
      setRequests([])
    }

    setLoading(false)
  }, [filter])

  // Fetch on mount and when filter changes
  useEffect(() => {
    fetchRequests()
  }, [fetchRequests])

  const approveRequest = async (
    id: string,
    notes: string,
    checklist: ChecklistState,
    reviewerName: string
  ) => {
    await updateRefundRequest(id, {
      status: 'approved',
      admin_notes: notes || null,
      ...checklist,
      reviewed_by: reviewerName,
      reviewed_at: new Date().toISOString(),
    })
    await fetchRequests()
  }

  const denyRequest = async (
    id: string,
    notes: string,
    reviewerName: string
  ) => {
    await updateRefundRequest(id, {
      status: 'denied',
      admin_notes: notes || null,
      reviewed_by: reviewerName,
      reviewed_at: new Date().toISOString(),
    })
    await fetchRequests()
  }

  // Count helpers
  const counts = {
    all: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    denied: requests.filter(r => r.status === 'denied').length,
  }

  return {
    requests,
    loading,
    error,
    filter,
    setFilter,
    counts,
    approveRequest,
    denyRequest,
    refetch: fetchRequests,
  }
}
