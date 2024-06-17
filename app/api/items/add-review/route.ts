import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { json } from 'stream/consumers';

export async function GET(request: Request) {
  //   const { productID, authorID, authorUsername,authorAvatar,review,star } = await request.json();
  const productID = 1;
  const authorID = 'auth0|666f6aad6e81753ef42e5243';
  const authorUsername = 'nodar.miminoshvili';
  const authorAvatar =
    'https://s.gravatar.com/avatar/4def4ba8256615619a094f904c91f3eb?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fno.png';
  const review = JSON.stringify({ text: "thieves won't be happy, noice " });
  const star = 5;

  try {
    // if (!user || !email || !age) throw new Error('Name and email are required');

    await sql`INSERT INTO reviews (product_id, author_id, author_username, author_avatar, review, star) VALUES (${productID}, ${authorID}, ${authorUsername}, ${authorAvatar}, ${review}, ${star})`;
    return NextResponse.json({ res: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ sucess: true }, { status: 200 });
}
