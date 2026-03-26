import { useCallback, useEffect, useState } from 'react'
import type { RefundRequest, RefundStatus } from '../lib/types'
import { supabase } from '../lib/supabase'

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

    let query = supabase
      .from('refund_requests')
      .select('*')
      .order('created_at', { ascending: false })

    const activeFilter = statusFilter ?? filter
    if (activeFilter !== 'all') {
      query = query.eq('status', activeFilter)
    }

    const { data, error: fetchError } = await query

    if (fetchError) {
      setError(fetchError.message)
      setRequests([])
    } else {
      setRequests((data as RefundRequest[]) || [])
    }

    setLoading(false)
  }, [filter])

  // Fetch on mount and when filter changes
  useEffect(() => {
    fetchRequests()
  }, [fetchRequests])

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('refund_requests_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'refund_requests' },
        () => {
          // Refetch on any change
          fetchRequests()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchRequests])

  const approveRequest = async (
    id: string,
    notes: string,
    checklist: ChecklistState,
    reviewerEmail: string
  ) => {
    const { error: updateError } = await supabase
      .from('refund_requests')
      .update({
        status: 'approved',
        admin_notes: notes || null,
        ...checklist,
        reviewed_by: reviewerEmail,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (updateError) {
      throw new Error(updateError.message)
    }
  }

  const denyRequest = async (
    id: string,
    notes: string,
    reviewerEmail: string
  ) => {
    const { error: updateError } = await supabase
      .from('refund_requests')
      .update({
        status: 'denied',
        admin_notes: notes || null,
        reviewed_by: reviewerEmail,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (updateError) {
      throw new Error(updateError.message)
    }
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
