import { getSession } from '@auth0/nextjs-auth0';
import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const sub = request.headers.get('authorization');

  try {
    if (!body) throw new Error('request body is required');
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  await sql`UPDATE carts SET cart = ${body} WHERE user_auth_id=${sub};`;

  return NextResponse.json({ SUCSESS: true }, { status: 200 });
}
