import { getSession } from '@auth0/nextjs-auth0';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';


export async function POST(request: Request): Promise<NextResponse> {
    const rawinfo = await getSession()
    const userID = rawinfo?.user.sub

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if(filename && request.body){
        const blob = await put(filename, request.body, {
            access: 'public',
        });

    await sql`UPDATE customers SET avatar = ${blob.url} WHERE customer_id = ${userID};`

        return NextResponse.json(blob);
    }else {
        return NextResponse.json({complete: false}, { status: 200 });

    }
}