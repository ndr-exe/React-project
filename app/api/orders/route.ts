import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { userID, orderInfo } = await request.json();

  try {
    if (!userID || !orderInfo)
      throw new Error('userID and information about the order is required');

    await sql`INSERT INTO orders (user_auth_id, order_info) VALUES (${userID}, ${orderInfo})`;
    return NextResponse.json({ res: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const userID = request.headers.get('authorization');

  try {
    if (!userID) throw new Error('userID is required');
    const ordersRaw = await sql`SELECT * FROM orders WHERE user_auth_id = ${userID}`;
    const orders = ordersRaw.rows;

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const id = await request.json();

  try {
    await sql`DELETE FROM reviews WHERE id = ${id}`;
    return NextResponse.json({ res: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ sucess: true }, { status: 200 });
}
