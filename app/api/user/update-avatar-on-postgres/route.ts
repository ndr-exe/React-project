import { getSession } from '@auth0/nextjs-auth0';
import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  const { blobUrl, id } = await request.json();

  try {
    // if (!body) throw new Error('request body is required');
    await sql`UPDATE users SET avatar = ${blobUrl} WHERE auth_id=${id};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ SUCSESS: true }, { status: 200 });
}
