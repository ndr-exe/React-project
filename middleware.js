import { NextResponse,NextRequest} from 'next/server'
import {cookies} from 'next/headers'
 

export function middleware(request) {
    let isLogged = cookies().get('token') ? true : false


    if(!isLogged && !request.nextUrl.pathname.startsWith('/login') ){
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if(!isLogged && request.nextUrl.pathname.startsWith('/home')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (isLogged && request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/home', request.url))
    }
    if (isLogged && request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(new URL('/home', request.url))
    }
  

}
export const config = {
  matcher: ['/','/home','/home/:path*', '/login'],
}

