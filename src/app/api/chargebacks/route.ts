import { NextResponse } from 'next/server';
import { getChargebacksList } from '@/lib/infloww';

export async function GET() {
  try {
    const data = await getChargebacksList();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch chargebacks' },
      { status: 500 }
    );
  }
}
