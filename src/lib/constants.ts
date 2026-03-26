export const DHL_CLAIM_URL = 'https://www.dhl.com/us-en/home/our-divisions/express/customer-service/file-a-claim.html'

export const APPROVAL_TIMEFRAME = '48 to 72 hours'

export const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending Review',
  approved: 'Approved',
  denied: 'Denied',
}

export const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  denied: 'bg-red-100 text-red-800',
}
