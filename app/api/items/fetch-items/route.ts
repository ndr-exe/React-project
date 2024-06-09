import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
// export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const items = await sql`SELECT * FROM products;`;

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
