/*
  # Marketing Studio Database Schema

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `category` (text)
      - `created_at` (timestamptz)
      
    - `campaigns`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `name` (text)
      - `status` (text)
      - `objective` (text)
      - `budget` (numeric)
      - `spent` (numeric)
      - `start_date` (date)
      - `end_date` (date)
      - `platforms` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `campaign_performance`
      - `id` (uuid, primary key)
      - `campaign_id` (uuid, foreign key)
      - `date` (date)
      - `impressions` (bigint)
      - `clicks` (bigint)
      - `conversions` (bigint)
      - `spend` (numeric)
      - `revenue` (numeric)
      - `ctr` (numeric)
      - `cpc` (numeric)
      - `roas` (numeric)
      - `created_at` (timestamptz)
      
    - `mmm_analysis`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `analysis_date` (date)
      - `campaign_contributions` (jsonb) - stores campaign_id -> contribution_score mapping
      - `recommendations` (jsonb) - stores AI recommendations
      - `optimal_allocations` (jsonb) - stores recommended budget allocations
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read their organization's data
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  name text NOT NULL,
  status text DEFAULT 'draft',
  objective text,
  budget numeric DEFAULT 0,
  spent numeric DEFAULT 0,
  start_date date,
  end_date date,
  platforms jsonb DEFAULT '[]'::jsonb,
  target_audience jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read campaigns"
  ON campaigns
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert campaigns"
  ON campaigns
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update campaigns"
  ON campaigns
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete campaigns"
  ON campaigns
  FOR DELETE
  TO authenticated
  USING (true);

-- Create campaign_performance table
CREATE TABLE IF NOT EXISTS campaign_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id) ON DELETE CASCADE,
  date date NOT NULL,
  impressions bigint DEFAULT 0,
  clicks bigint DEFAULT 0,
  conversions bigint DEFAULT 0,
  spend numeric DEFAULT 0,
  revenue numeric DEFAULT 0,
  ctr numeric DEFAULT 0,
  cpc numeric DEFAULT 0,
  roas numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(campaign_id, date)
);

ALTER TABLE campaign_performance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read campaign performance"
  ON campaign_performance
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert campaign performance"
  ON campaign_performance
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update campaign performance"
  ON campaign_performance
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create mmm_analysis table
CREATE TABLE IF NOT EXISTS mmm_analysis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  analysis_date date NOT NULL,
  campaign_contributions jsonb DEFAULT '{}'::jsonb,
  recommendations jsonb DEFAULT '[]'::jsonb,
  optimal_allocations jsonb DEFAULT '{}'::jsonb,
  model_metrics jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mmm_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read mmm analysis"
  ON mmm_analysis
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert mmm analysis"
  ON mmm_analysis
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_campaigns_product_id ON campaigns(product_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaign_performance_campaign_id ON campaign_performance(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_performance_date ON campaign_performance(date);
CREATE INDEX IF NOT EXISTS idx_mmm_analysis_product_id ON mmm_analysis(product_id);
CREATE INDEX IF NOT EXISTS idx_mmm_analysis_date ON mmm_analysis(analysis_date);

-- Insert sample products
INSERT INTO products (id, name, description, category) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Premium Sneakers', 'High-end athletic footwear', 'Footwear'),
  ('22222222-2222-2222-2222-222222222222', 'Smart Watch Pro', 'Advanced fitness tracking watch', 'Electronics'),
  ('33333333-3333-3333-3333-333333333333', 'Organic Protein Powder', 'Plant-based nutrition supplement', 'Nutrition')
ON CONFLICT (id) DO NOTHING;

-- Insert sample campaigns
INSERT INTO campaigns (id, product_id, name, status, objective, budget, spent, start_date, end_date, platforms) VALUES
  ('c1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Summer Sale 2025', 'running', 'Drive conversions and increase sales', 50000, 32000, '2025-10-01', '2025-11-15', '["Facebook", "Instagram", "Google Ads"]'::jsonb),
  ('c2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Brand Awareness Q4', 'running', 'Increase brand visibility', 35000, 28000, '2025-09-15', '2025-12-31', '["YouTube", "TikTok", "Instagram"]'::jsonb),
  ('c3333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'Product Launch Teaser', 'running', 'Generate buzz for new product', 25000, 18000, '2025-10-01', '2025-11-10', '["Twitter", "LinkedIn", "Facebook"]'::jsonb),
  ('c4444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'Holiday Special', 'running', 'Drive holiday sales', 60000, 42000, '2025-10-05', '2025-12-25', '["Facebook", "Instagram", "Google Ads", "Pinterest"]'::jsonb),
  ('c5555555-5555-5555-5555-555555555555', '33333333-3333-3333-3333-333333333333', 'Health & Wellness Campaign', 'running', 'Promote healthy lifestyle', 40000, 25000, '2025-09-20', '2025-12-20', '["Instagram", "YouTube", "TikTok"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Insert sample performance data
INSERT INTO campaign_performance (campaign_id, date, impressions, clicks, conversions, spend, revenue, ctr, cpc, roas) VALUES
  ('c1111111-1111-1111-1111-111111111111', '2025-10-10', 850000, 25500, 1530, 10200, 45900, 3.0, 0.40, 4.5),
  ('c2222222-2222-2222-2222-222222222222', '2025-10-10', 620000, 15500, 930, 7800, 27900, 2.5, 0.50, 3.6),
  ('c3333333-3333-3333-3333-333333333333', '2025-10-10', 450000, 13500, 810, 6000, 24300, 3.0, 0.44, 4.1),
  ('c4444444-4444-4444-4444-444444444444', '2025-10-10', 920000, 27600, 1656, 13800, 49680, 3.0, 0.50, 3.6),
  ('c5555555-5555-5555-5555-555555555555', '2025-10-10', 680000, 20400, 1224, 8500, 36720, 3.0, 0.42, 4.3)
ON CONFLICT (campaign_id, date) DO NOTHING;

-- Insert sample MMM analysis
INSERT INTO mmm_analysis (product_id, analysis_date, campaign_contributions, recommendations, optimal_allocations, model_metrics) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    '2025-10-10',
    '{
      "c1111111-1111-1111-1111-111111111111": {"contribution": 0.58, "efficiency": 0.92, "roi": 4.5},
      "c2222222-2222-2222-2222-222222222222": {"contribution": 0.42, "efficiency": 0.78, "roi": 3.6}
    }'::jsonb,
    '[
      {
        "type": "budget_reallocation",
        "priority": "high",
        "message": "Summer Sale campaign shows 23% higher ROI (4.5 vs 3.6). Recommend shifting $5,000 from Brand Awareness to Summer Sale for optimal returns.",
        "impact": "Projected additional revenue: $22,500"
      },
      {
        "type": "optimization",
        "priority": "medium",
        "message": "Both campaigns targeting Premium Sneakers show strong performance. Consider increasing total budget by 15% to capitalize on demand.",
        "impact": "Expected ROI: 4.2x on additional spend"
      }
    ]'::jsonb,
    '{
      "c1111111-1111-1111-1111-111111111111": {"current": 50000, "recommended": 55000, "change_pct": 10},
      "c2222222-2222-2222-2222-222222222222": {"current": 35000, "recommended": 30000, "change_pct": -14.3}
    }'::jsonb,
    '{"r_squared": 0.87, "mape": 8.2, "confidence": "high"}'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    '2025-10-10',
    '{
      "c3333333-3333-3333-3333-333333333333": {"contribution": 0.46, "efficiency": 0.88, "roi": 4.1},
      "c4444444-4444-4444-4444-444444444444": {"contribution": 0.54, "efficiency": 0.82, "roi": 3.6}
    }'::jsonb,
    '[
      {
        "type": "budget_reallocation",
        "priority": "high",
        "message": "Product Launch Teaser delivers 14% better ROI than Holiday Special. Reallocate $8,000 to maximize returns during launch window.",
        "impact": "Projected additional revenue: $32,800"
      },
      {
        "type": "platform_optimization",
        "priority": "medium",
        "message": "LinkedIn and Twitter show exceptional performance for Product Launch. Consider increasing social platform spend by 20%.",
        "impact": "Expected engagement increase: 28%"
      }
    ]'::jsonb,
    '{
      "c3333333-3333-3333-3333-333333333333": {"current": 25000, "recommended": 33000, "change_pct": 32},
      "c4444444-4444-4444-4444-444444444444": {"current": 60000, "recommended": 52000, "change_pct": -13.3}
    }'::jsonb,
    '{"r_squared": 0.91, "mape": 6.8, "confidence": "high"}'::jsonb
  )
ON CONFLICT DO NOTHING;