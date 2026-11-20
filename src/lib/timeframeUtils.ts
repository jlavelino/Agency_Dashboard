import {
  AgencyMetricsSummary,
  RevenueDataPoint,
  Creator,
  MarketingAsset,
  ChargebackRecord,
  ChatterPerformance,
} from '@/types/infloww';

export function getTimeframeMultiplier(timeframe: string): number {
  switch (timeframe) {
    case '7D':
      return 0.2333;
    case 'Month':
    case 'This Month':
      return 0.6333;
    case 'Q4':
      return 2.85;
    case '30D':
    default:
      return 1.0;
  }
}

export function getTimeframeTitle(timeframe: string): string {
  switch (timeframe) {
    case '7D':
      return '7-Day Trailing Gross';
    case 'Month':
    case 'This Month':
      return 'Month-to-Date Gross';
    case 'Q4':
      return 'Q4 Quarterly Gross';
    case '30D':
    default:
      return 'Monthly Agency Gross';
  }
}

export function getTimeframeGoal(timeframe: string): { goal: number; label: string } {
  switch (timeframe) {
    case '7D':
      return { goal: 37500, label: '7-Day Pace ($37.5k Goal)' };
    case 'Month':
    case 'This Month':
      return { goal: 100000, label: 'MTD Pace ($100k Goal)' };
    case 'Q4':
      return { goal: 480000, label: 'Q4 Pace ($480k Goal)' };
    case '30D':
    default:
      return { goal: 160000, label: 'Target Pace ($160k Goal)' };
  }
}

export function getScaledSummary(base: AgencyMetricsSummary, timeframe: string): AgencyMetricsSummary {
  switch (timeframe) {
    case '7D':
      return {
        ...base,
        total_revenue_month: 34650,
        revenue_growth_percentage: 18.2,
        fans_growth_percentage: 2.4,
        total_chargebacks_amount: 290,
        chargeback_rate_percentage: 0.72,
        marketing_roi_percentage: 365,
      };
    case 'Month':
    case 'This Month':
      return {
        ...base,
        total_revenue_month: 94060,
        revenue_growth_percentage: 15.4,
        fans_growth_percentage: 6.1,
        total_chargebacks_amount: 780,
        chargeback_rate_percentage: 0.81,
        marketing_roi_percentage: 348,
      };
    case 'Q4':
      return {
        ...base,
        total_revenue_month: 423280,
        revenue_growth_percentage: 22.6,
        fans_growth_percentage: 28.5,
        total_chargebacks_amount: 3650,
        chargeback_rate_percentage: 0.86,
        marketing_roi_percentage: 380,
      };
    case '30D':
    default:
      return base;
  }
}

export function getScaledCreators(creators: Creator[], timeframe: string): Creator[] {
  const mult = getTimeframeMultiplier(timeframe);
  return creators.map((c) => ({
    ...c,
    monthly_revenue: Math.round(c.monthly_revenue * mult),
  }));
}

export function getScaledMarketing(assets: MarketingAsset[], timeframe: string): MarketingAsset[] {
  const mult = getTimeframeMultiplier(timeframe);
  return assets.map((a) => ({
    ...a,
    clicks: Math.round(a.clicks * mult),
    conversions: Math.round(a.conversions * mult),
    attributed_revenue: Math.round(a.attributed_revenue * mult),
  }));
}

export function getScaledChargebacks(chargebacks: ChargebackRecord[], timeframe: string): ChargebackRecord[] {
  switch (timeframe) {
    case '7D':
      return chargebacks.slice(0, 3);
    case 'Month':
    case 'This Month':
      return chargebacks.slice(0, 5);
    case 'Q4':
    case '30D':
    default:
      return chargebacks;
  }
}

export function getScaledChatters(chatters: ChatterPerformance[], timeframe: string): ChatterPerformance[] {
  const mult = getTimeframeMultiplier(timeframe);
  return chatters.map((c) => ({
    ...c,
    sales_generated: Math.round(c.sales_generated * mult),
    messages_sent: Math.round(c.messages_sent * mult),
  }));
}

export function getScaledTrends(trends: RevenueDataPoint[], timeframe: string): RevenueDataPoint[] {
  switch (timeframe) {
    case '7D':
      return trends.slice(-4);
    case 'Month':
    case 'This Month':
      return trends.slice(0, 8);
    case 'Q4':
      return [
        { date: 'Oct 01', revenue: 3800, subscriptions: 1600, tips: 1000, messages: 1200 },
        { date: 'Oct 15', revenue: 4100, subscriptions: 1750, tips: 1100, messages: 1250 },
        { date: 'Nov 01', revenue: 4200, subscriptions: 1800, tips: 1100, messages: 1300 },
        { date: 'Nov 07', revenue: 5300, subscriptions: 2200, tips: 1400, messages: 1700 },
        { date: 'Nov 15', revenue: 6400, subscriptions: 2600, tips: 1750, messages: 2050 },
        { date: 'Nov 19', revenue: 6850, subscriptions: 2800, tips: 1900, messages: 2150 },
        { date: 'Dec 01 (Est)', revenue: 7400, subscriptions: 3100, tips: 2050, messages: 2250 },
        { date: 'Dec 15 (Est)', revenue: 8100, subscriptions: 3400, tips: 2250, messages: 2450 },
      ];
    case '30D':
    default:
      return trends;
  }
}
