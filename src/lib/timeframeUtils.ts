import { AgencyMetricsSummary, RevenueDataPoint } from '@/types/infloww';

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

export function getScaledTrends(trends: RevenueDataPoint[], timeframe: string): RevenueDataPoint[] {
  switch (timeframe) {
    case '7D':
      // Return the most recent 4 data points (e.g. 7-day span)
      return trends.slice(-4);
    case 'This Month':
      return trends;
    case 'Q4':
      // Projected extended trend points
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
