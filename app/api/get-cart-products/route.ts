import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const sub = request.headers.get('authorization');

  try {
    const cartItems =
      await sql`SELECT cart FROM carts WHERE user_auth_id=${sub};`;

    return NextResponse.json({ cartItems }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
