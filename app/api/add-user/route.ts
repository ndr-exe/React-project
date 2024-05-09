import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { user, email, age } = await request.json();
  console.log(user,email,age)

  try {
    if (!user || !email || !age) throw new Error('Name and email are required');

    await sql`INSERT INTO users (name, email, age) VALUES (${user}, ${email}, ${age});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const users = await sql`SELECT * FROM users;`;

  return NextResponse.json({ users }, { status: 200 });
}