import { Creator, MarketingAsset, ChargebackRecord, AgencyMetricsSummary } from '@/types/infloww';

export function exportCreatorsToCsv(creators: Creator[], timeframe: string = '30D') {
  const headers = [
    'Creator ID',
    'Name',
    'Username',
    'Status',
    'Monthly Gross ($)',
    'Previous Monthly Gross ($)',
    'Growth Rate (%)',
    'Active Fans Count',
    'Primary Chatter',
    'Chargeback Rate (%)',
    'Chargebacks Count',
    'Joined Date',
  ];

  const rows = creators.map((c) => [
    `"${c.id}"`,
    `"${c.name}"`,
    `"${c.username}"`,
    `"${c.status}"`,
    c.monthly_revenue,
    c.previous_monthly_revenue,
    c.growth_rate,
    c.fans_count,
    `"${c.primary_chatter || 'Unassigned'}"`,
    c.chargeback_rate,
    c.chargebacks_count,
    `"${c.joined_date}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  downloadBlob(csvContent, `muse_creators_report_${timeframe.toLowerCase().replace(/\s+/g, '_')}_${getDateString()}.csv`);
}

export function exportAgencyAuditCsv(
  summary: AgencyMetricsSummary,
  creators: Creator[],
  assets: MarketingAsset[],
  chargebacks: ChargebackRecord[]
) {
  let content = '=== MUSE MANAGEMENT AGENCY AUDIT REPORT ===\n';
  content += `Generated At: ${new Date().toISOString()}\n`;
  content += `Agency OID: 1223928978604066\n`;
  content += `Monthly Gross Revenue: $${summary.total_revenue_month}\n`;
  content += `MoM Growth Rate: +${summary.revenue_growth_percentage}%\n`;
  content += `Total Active Fans: ${summary.total_fans_count}\n`;
  content += `Portfolio Chargeback Rate: ${summary.chargeback_rate_percentage}%\n\n`;

  content += '--- MANAGED CREATORS ---\n';
  content += 'ID,Name,Username,Status,Gross Revenue,Fans,Primary Chatter,Risk\n';
  creators.forEach((c) => {
    content += `"${c.id}","${c.name}","${c.username}","${c.status}",$${c.monthly_revenue},${c.fans_count},"${c.primary_chatter || ''}",${c.chargeback_rate}%\n`;
  });

  content += '\n--- MARKETING ATTRIBUTED ASSETS ---\n';
  content += 'Asset ID,Name,Type,Clicks,Conversions,Conv Rate,Attributed Gross\n';
  assets.forEach((a) => {
    content += `"${a.asset_id}","${a.name}","${a.asset_type}",${a.clicks},${a.conversions},${a.conversion_rate}%,$${a.attributed_revenue}\n`;
  });

  content += '\n--- CHARGEBACK INCIDENTS ---\n';
  content += 'Incident ID,Creator,Amount,Reason,Date,Status\n';
  chargebacks.forEach((cb) => {
    content += `"${cb.id}","${cb.creator_name}",$${cb.amount},"${cb.reason}","${cb.date}","${cb.status}"\n`;
  });

  downloadBlob(content, `muse_agency_complete_audit_${getDateString()}.csv`);
}

function downloadBlob(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function getDateString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}
