import { NextResponse } from 'next/server';
import { getMarketingAssetsList } from '@/lib/infloww';

export async function GET() {
  try {
    const data = await getMarketingAssetsList();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch marketing assets' },
      { status: 500 }
    );
  }
}
