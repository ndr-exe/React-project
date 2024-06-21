import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  const { id, title, description, price, brand, category, thumbnail, images }: Awaited<Item> =
    await request.json();
  const descriptionCorrected = JSON.stringify(description);
  const imgsCorrected = JSON.stringify(images);

  try {
    await sql`UPDATE products SET 
      title=${title}, 
      description=${descriptionCorrected}, 
      price=${price}, brand=${brand}, 
      category=${category}, 
      thumbnail=${thumbnail}, 
      images=${imgsCorrected}
       WHERE id = ${id}`;

    // await sql`INSERT INTO reviews (product_id, author_id, author_username, author_avatar, review, star) VALUES (${product_id}, ${author_id}, ${author_username}, ${author_avatar}, ${review}, ${star})`;
    return NextResponse.json({ res: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ sucess: true }, { status: 200 });
}
