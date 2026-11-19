import { NextResponse } from 'next/server';
import { getCreatorsList } from '@/lib/infloww';

export async function GET() {
  try {
    const data = await getCreatorsList();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch creators' },
      { status: 500 }
    );
  }
}
