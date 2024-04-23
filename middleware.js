import { NextResponse,NextRequest} from 'next/server'
import {cookies} from 'next/headers'


let locales = ['en','ge']
 
function getLocale(request) { 
    let locale = cookies().get('locale')
    if (locale) return locale.value
    return locale = 'en'
}


export function middleware(request) {
  
  let { pathname } = request.nextUrl
  let pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  let isLogged = cookies().get('token') ? true : false
  const locale = getLocale(request)

  


  if(!isLogged && pathname.indexOf('login') === -1){

      pathname = '/login'
      pathnameHasLocale = false
  }

  else if(isLogged && pathname.indexOf('login') !== -1){


    pathname = '/marketplace'
    pathnameHasLocale = false
  }

  else if(isLogged && pathname === '/' || isLogged && pathname === `/${locale}`) {


    pathname = `/marketplace`
    pathnameHasLocale = false
  }

  
  if (pathnameHasLocale) return
 
  // Redirect if there is no locale
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}
