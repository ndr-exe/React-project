import { getSession } from "@auth0/nextjs-auth0";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (_: NextRequest) => {
    const data = await getSession();

    let id, email, avatar;

    if (data) {
        id = data.user.sub;
        email = data.user.email;
        avatar = data.user.picture;
    }

    try {
        await sql`INSERT INTO customers (customer_id, email, avatar) VALUES (${id}, ${email}, ${avatar}) ON CONFLICT (customer_id) DO NOTHING`.catch((e) => console.log(e));
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({status: 400});
    }
    return redirect('/profile');
}