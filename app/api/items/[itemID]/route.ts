import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
// export const dynamic = 'force-dynamic';

// export async function GET(request: Request,{ params }: { params: { slug: string }) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get('id');

//   try {
//     const items = await sql`SELECT * FROM products WHERE id={${id}};`;

//     return NextResponse.json({ items }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

export async function GET(request: Request, { params }: { params: { itemID: string } }) {
  const itemID = params.itemID; // 'a', 'b', or 'c'

  try {
    const item = await sql`SELECT * FROM products WHERE id=${Number(itemID)};`;

    return NextResponse.json({ item }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
