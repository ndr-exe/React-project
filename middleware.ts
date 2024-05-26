import { NextResponse,NextRequest} from 'next/server'
import {cookies} from 'next/headers'



let locales = ['en','ge']

 
export async function middleware(request: NextRequest) {
  
  // let isLogged = cookies().get('token') ? true : false
  let {pathname} = request.nextUrl
  let pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  let middlewareResponse

  if(pathname.startsWith('/ProfileAuth')) {
    return NextResponse.redirect('https://www.youtube.com/watch?v=xvFZjo5PgG0')
  }

  if(!cookies().get('locale')) {
    request.nextUrl.pathname = `${pathname}`
      middlewareResponse = NextResponse.redirect(request.nextUrl)
      middlewareResponse.cookies.set('locale', 'en');
      return middlewareResponse
  }


  if(pathnameHasLocale){
      const locale = pathname.slice(1,3)
      request.nextUrl.pathname = `${pathname.slice(3)}`
      middlewareResponse = NextResponse.redirect(request.nextUrl)
      middlewareResponse.cookies.set('locale', `${locale}`);
      return middlewareResponse
  }

  

  // if(!isLogged && pathname.startsWith('/login')){
  //   return  
  // }

  // if(!isLogged && !(pathname.startsWith('/login'))){
  //   request.nextUrl.pathname = `/login`
  //   middlewareResponse = NextResponse.redirect(request.nextUrl)
  //   return middlewareResponse  
  // }

  // if(isLogged && pathname.startsWith('/login')){
  //   request.nextUrl.pathname = `/marketplace`
  //   middlewareResponse = NextResponse.redirect(request.nextUrl)
  //   return middlewareResponse  
  // }

  if(
    // isLogged &&
     (pathname === '/' || pathname === '/en' || pathname === '/ge')){
    request.nextUrl.pathname = `/marketplace`
    middlewareResponse = NextResponse.redirect(request.nextUrl)
    return middlewareResponse  
  }
  return
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api).*)',
    // '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}

