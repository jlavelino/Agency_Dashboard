export interface Creator {
  id: string;
  creator_id: string;
  name: string;
  username: string;
  avatar_url?: string;
  status: 'active' | 'inactive';
  fans_count: number;
  monthly_revenue: number;
  previous_monthly_revenue: number;
  growth_rate: number;
  chargeback_rate: number;
  chargebacks_count: number;
  joined_date: string;
  primary_chatter?: string;
}

export interface MarketingAsset {
  asset_id: string;
  name: string;
  asset_type: 'tracking_link' | 'free_trial_link' | 'promotion';
  creator_id: string;
  creator_name?: string;
  created_at: string;
  clicks: number;
  conversions: number;
  conversion_rate: number;
  attributed_revenue: number;
  target_url?: string;
}

export interface MarketingAnalytics {
  total_clicks: number;
  total_conversions: number;
  average_conversion_rate: number;
  attributed_revenue: number;
  assets: MarketingAsset[];
}

export interface ChargebackRecord {
  id: string;
  creator_id: string;
  creator_name: string;
  amount: number;
  date: string;
  reason: string;
  status: 'disputed' | 'resolved' | 'lost';
  fan_username?: string;
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  subscriptions: number;
  tips: number;
  messages: number;
}

export interface ChatterPerformance {
  id: string;
  name: string;
  assigned_creators: string[];
  shift: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  messages_sent: number;
  sales_generated: number;
  conversion_rate: number;
  avg_response_time_min: number;
  status: 'active' | 'off_shift';
}

export interface AgencyMetricsSummary {
  total_revenue_month: number;
  revenue_growth_percentage: number;
  active_creators_count: number;
  total_fans_count: number;
  fans_growth_percentage: number;
  total_chargebacks_amount: number;
  chargeback_rate_percentage: number;
  top_performing_creator: string;
  active_chatters_count: number;
  marketing_roi_percentage: number;
}
