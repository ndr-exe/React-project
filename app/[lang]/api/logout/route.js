import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
    cookies().delete('token')
    return NextResponse.redirect(new URL('/marketplace',request.url))
  }
