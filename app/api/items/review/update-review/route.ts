import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  const { id, review, star } = await request.json();

  try {
    // if (!user || !email || !age) throw new Error('Name and email are required');
    await sql`UPDATE reviews SET review=${review}, star=${star} WHERE id = ${id}`;

    // await sql`INSERT INTO reviews (product_id, author_id, author_username, author_avatar, review, star) VALUES (${product_id}, ${author_id}, ${author_username}, ${author_avatar}, ${review}, ${star})`;
    return NextResponse.json({ res: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ sucess: true }, { status: 200 });
}
