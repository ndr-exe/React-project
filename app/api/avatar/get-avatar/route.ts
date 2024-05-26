import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    const sub = request.headers.get('authorization')

    try {
        const avatar = await sql`SELECT avatar FROM customers WHERE customer_id=${sub};`;

        return NextResponse.json({ avatar }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: sub }, { status: 500 });
    }
}