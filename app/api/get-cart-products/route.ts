import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'

export async function GET() {

  try {
    const cartProducts = await sql`SELECT cart_products FROM carts WHERE user_id=9;`;

    return NextResponse.json({ cartProducts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}