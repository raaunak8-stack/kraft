import { supabase } from '../lib/supabase';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface CampaignData {
  id: string;
  product_id: string;
  name: string;
  status: string;
  objective: string;
  budget: number;
  spent: number;
  start_date: string;
  end_date: string;
  platforms: string[];
  product?: Product;
}

export interface PerformanceData {
  campaign_id: string;
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
  ctr: number;
  cpc: number;
  roas: number;
}

export interface MMMAnalysis {
  id: string;
  product_id: string;
  analysis_date: string;
  campaign_contributions: Record<string, any>;
  recommendations: Array<{
    type: string;
    priority: string;
    message: string;
    impact: string;
  }>;
  optimal_allocations: Record<string, any>;
  model_metrics: Record<string, any>;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
};

export const fetchCampaignsByProduct = async (productId: string): Promise<CampaignData[]> => {
  const { data, error } = await supabase
    .from('campaigns')
    .select(`
      *,
      product:products(*)
    `)
    .eq('product_id', productId)
    .eq('status', 'running')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const fetchCampaignPerformance = async (campaignId: string): Promise<PerformanceData[]> => {
  const { data, error } = await supabase
    .from('campaign_performance')
    .select('*')
    .eq('campaign_id', campaignId)
    .order('date', { ascending: false })
    .limit(30);

  if (error) throw error;
  return data || [];
};

export const fetchMMMAnalysis = async (productId: string): Promise<MMMAnalysis | null> => {
  const { data, error } = await supabase
    .from('mmm_analysis')
    .select('*')
    .eq('product_id', productId)
    .order('analysis_date', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const fetchAllCampaigns = async (): Promise<CampaignData[]> => {
  const { data, error } = await supabase
    .from('campaigns')
    .select(`
      *,
      product:products(*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};
