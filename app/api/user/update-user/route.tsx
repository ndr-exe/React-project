import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const user = searchParams.get("name");
  const email = searchParams.get("email");
  const age = searchParams.get("age");
  const id = searchParams.get("id");


 try {
  if (!user || !email || !age) throw new Error('Name and email are required');

  // await sql`INSERT INTO users (name, email, age) VALUES (${user}, ${email}, ${age});`;
} catch (error) {
  return NextResponse.json({ error }, { status: 500 });
}


await sql`UPDATE users SET name = ${user}, email = ${email}, age = ${age} WHERE id = ${Number(id)};`
  

  const users = await sql`SELECT * FROM users;`;

  return NextResponse.json({ users }, { status: 200 });
}
