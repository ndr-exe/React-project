import { getSession } from '@auth0/nextjs-auth0';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (_: NextRequest) => {
  const data = await getSession();

  const id = data!.user.sub;
  const username = data!.user.nickname;
  const avatar = data!.user.picture;

  try {
    await sql`INSERT INTO users (auth_id, username, avatar) VALUES (${id}, ${username}, ${avatar}) ON CONFLICT (auth_id) DO NOTHING`;
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
  return redirect('/shop');
};
