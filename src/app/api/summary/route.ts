import { NextResponse } from 'next/server';
import { getAgencySummary } from '@/lib/infloww';

export async function GET() {
  try {
    const data = await getAgencySummary();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch summary' },
      { status: 500 }
    );
  }
}
