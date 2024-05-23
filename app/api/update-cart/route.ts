import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  const body = await request.json()


 try {
  if (!body) throw new Error('request body is required');
} catch (error) {
  return NextResponse.json({ error }, { status: 500 });
}


await sql`UPDATE carts SET cart_products = ${body} WHERE user_id = ${Number(9)};`
  

  return NextResponse.json({ 'SUCSESS':true }, { status: 200 });
}
