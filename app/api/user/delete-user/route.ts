import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  const { userToDelete } = await request.json();

  try {
    if (!userToDelete) throw new Error('ID is required');

    await sql`DELETE FROM users WHERE id = ${Number(userToDelete)};`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const users = await sql`SELECT * FROM users;`;

  return NextResponse.json({ users }, { status: 200 });
}
