-- Cubic Ship - Refund Request System Schema
-- Run this in Supabase SQL Editor

-- Table: refund_requests
CREATE TABLE refund_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Customer info
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,

  -- Shipment info
  tracking_number TEXT NOT NULL,
  shipment_date DATE NOT NULL,
  return_reason TEXT NOT NULL,
  left_us BOOLEAN NOT NULL DEFAULT FALSE,

  -- Agent workflow info
  agent_name TEXT NOT NULL DEFAULT '',
  customer_contacted BOOLEAN NOT NULL DEFAULT FALSE,

  -- Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied')),
  admin_notes TEXT,

  -- Admin checklist
  checklist_reason_documented BOOLEAN DEFAULT FALSE,
  checklist_agent_contacted_cr BOOLEAN DEFAULT FALSE,
  checklist_agent_documented_issue BOOLEAN DEFAULT FALSE,
  checklist_shipment_in_us BOOLEAN DEFAULT FALSE,

  -- Review tracking
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_refund_requests_status ON refund_requests(status);
CREATE INDEX idx_refund_requests_created ON refund_requests(created_at DESC);

-- RLS
ALTER TABLE refund_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a refund request (public form)
CREATE POLICY "Anyone can submit refund request"
  ON refund_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated admins can view requests
CREATE POLICY "Admins can view all requests"
  ON refund_requests FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated admins can update (approve/deny)
CREATE POLICY "Admins can update requests"
  ON refund_requests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON refund_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Enable realtime for the table
ALTER PUBLICATION supabase_realtime ADD TABLE refund_requests;
