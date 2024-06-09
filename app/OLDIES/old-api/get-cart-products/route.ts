import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'

export async function GET(request:NextRequest) {
  const sub = request.headers.get('authorization')


  try {
    const cartProducts = await sql`SELECT customer_cart FROM customer_carts WHERE customer_id=${sub};`;

    return NextResponse.json({ cartProducts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}