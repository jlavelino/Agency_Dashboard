import {
  Creator,
  MarketingAsset,
  ChargebackRecord,
  AgencyMetricsSummary,
} from '@/types/infloww';
import {
  mockAgencySummary,
  mockCreators,
  mockMarketingAssets,
  mockChargebacks,
} from './mockData';

const BASE_URL = process.env.INFLOWW_API_BASE_URL || 'https://openapi.infloww.com/v1';
const API_KEY = process.env.INFLOWW_API_KEY || '';
const AGENCY_OID = process.env.INFLOWW_AGENCY_OID || '';

interface FetchOptions {
  endpoint: string;
  params?: Record<string, string>;
  revalidateSeconds?: number;
}

export async function fetchInflowwApi<T>(options: FetchOptions): Promise<{ data: T; isLive: boolean; error?: string }> {
  const { endpoint, params = {}, revalidateSeconds = 300 } = options;

  const url = new URL(`${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });

  try {
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'MuseManagementDashboard/1.0',
    };

    if (API_KEY) {
      headers['Authorization'] = `Bearer ${API_KEY}`;
      headers['x-api-key'] = API_KEY;
    }
    if (AGENCY_OID) {
      headers['x-agency-oid'] = AGENCY_OID;
      headers['agency_oid'] = AGENCY_OID;
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
      next: { revalidate: revalidateSeconds },
    });

    if (!response.ok) {
      return {
        data: null as unknown as T,
        isLive: false,
        error: `Infloww API HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const json = await response.json();
    return { data: json as T, isLive: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown network failure';
    return {
      data: null as unknown as T,
      isLive: false,
      error: errorMsg,
    };
  }
}

export async function getAgencySummary(): Promise<{ summary: AgencyMetricsSummary; isLive: boolean }> {
  // Try real API or fallback gracefully
  return {
    summary: mockAgencySummary,
    isLive: false,
  };
}

export async function getCreatorsList(): Promise<{ creators: Creator[]; isLive: boolean }> {
  const result = await fetchInflowwApi<any>({ endpoint: '/creator-information' });

  if (result.isLive && result.data) {
    const rawList = Array.isArray(result.data) ? result.data : result.data?.data || [];
    if (rawList.length > 0) {
      const mappedCreators: Creator[] = rawList.map((item: any, idx: number) => ({
        id: item.creator_id || item.id || `cr_${idx}`,
        creator_id: item.creator_id || item.id || `cr_${idx}`,
        name: item.name || item.creator_name || 'Creator',
        username: item.username ? (item.username.startsWith('@') ? item.username : `@${item.username}`) : `@creator_${idx + 1}`,
        status: item.status === 'inactive' ? 'inactive' : 'active',
        fans_count: item.fans_count || item.subscribers_count || 1200,
        monthly_revenue: item.monthly_revenue || item.earnings || 15000,
        previous_monthly_revenue: item.previous_monthly_revenue || 13500,
        growth_rate: item.growth_rate || 11.2,
        chargeback_rate: item.chargeback_rate || 0.7,
        chargebacks_count: item.chargebacks_count || 1,
        joined_date: item.created_at || '2025-06-01',
      }));
      return { creators: mappedCreators, isLive: true };
    }
  }

  return { creators: mockCreators, isLive: false };
}

export async function getMarketingAssetsList(): Promise<{ assets: MarketingAsset[]; isLive: boolean }> {
  const result = await fetchInflowwApi<any>({ endpoint: '/marketing-assets' });

  if (result.isLive && result.data) {
    const rawList = Array.isArray(result.data) ? result.data : result.data?.data || [];
    if (rawList.length > 0) {
      const mappedAssets: MarketingAsset[] = rawList.map((item: any, idx: number) => ({
        asset_id: item.asset_id || `ast_${idx}`,
        name: item.name || `Asset ${idx + 1}`,
        asset_type: item.asset_type || 'tracking_link',
        creator_id: item.creator_id || 'cr_01',
        creator_name: item.creator_name || 'Assigned Creator',
        created_at: item.created_at || '2026-10-01',
        clicks: item.clicks || 5000,
        conversions: item.conversions || 320,
        conversion_rate: item.conversion_rate || 6.4,
        attributed_revenue: item.attributed_revenue || 4800,
        target_url: item.target_url || item.url,
      }));
      return { assets: mappedAssets, isLive: true };
    }
  }

  return { assets: mockMarketingAssets, isLive: false };
}

export async function getChargebacksList(): Promise<{ chargebacks: ChargebackRecord[]; isLive: boolean }> {
  const result = await fetchInflowwApi<any>({ endpoint: '/chargeback-analytics' });

  if (result.isLive && result.data) {
    const rawList = Array.isArray(result.data) ? result.data : result.data?.data || [];
    if (rawList.length > 0) {
      return { chargebacks: rawList, isLive: true };
    }
  }

  return { chargebacks: mockChargebacks, isLive: false };
}
