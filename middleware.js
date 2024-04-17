import { NextResponse,NextRequest} from 'next/server'
import {cookies} from 'next/headers'
 

export function middleware(request) {
    let isLogged = cookies().get('token') ? true : false


    if(!isLogged && request.nextUrl.pathname.startsWith('/home') ){
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (isLogged && request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/home', request.url))
    }
    
    


}
 