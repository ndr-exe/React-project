'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from "next/link"
// import { logout } from '../funcs'
// import { useEffect, useState } from 'react'
import ThemeButton from '../ThemeButton/ThemeButton'
import LangBtn from '../LangBtn'


export default function Navbar({dict}) {

    const pathname = usePathname()
    const router = useRouter()


    

  return (
    <nav className='w-full h-full flex'>

        <h1 className='flex items-center text-2xl pl-8 dark:text-gray-100'>fast <span className="text-orange-600">LAG</span>.</h1>

            <ul className='flex items-center gap-4 ml-8 text-sm text-gray-500 dark:text-gray-100'> 
                <li><Link href="/marketplace" className={`link ${pathname.indexOf('/marketplace') !== -1 ? 'active' : ''}`}>{dict.navbar.marketplace}</Link></li>
                <li><Link href="/blog" className={`link ${pathname.indexOf('/blog') !== -1 ? 'active' : ''}`}>{dict.navbar.blog}</Link></li>
                <li><Link href="/contact" className={`link ${pathname.indexOf('/contact') !== -1 ? 'active' : ''}`}>{dict.navbar.contact}</Link></li>
                <li><Link href="/profile" className={`link ${pathname.indexOf('/profile') !== -1 ? 'active' : ''}`}>{dict.navbar.profile}</Link></li>
            </ul>
            {/* <ul className='flex gap-8 ml-auto'>
                <li className='pl-6 flex items-center '><a href="/">Sign in</a></li>
                <li className='pr-6 flex items-center text-orange-600'><a href="/">Sign up</a></li>
            </ul> */}
            <ul className='flex ml-auto items-center'>
                <li>
                <LangBtn dict={dict}/>
                </li>
            <li className='pr-4'>
                <ThemeButton dict={dict}/>
            </li>
            <li className='text-lg pr-6 '>
                {/* <button 
                onClick={()=> {
                    logout()
                    router.refresh()
                    }}>{dict.options.logout}
                 </button> */}
                 <Link href="/logout" className='hover:text-orange-600 font-bold dark:text-gray-100'>{dict.options.logout}</Link>
            </li>
            
            </ul>
        </nav>
  )
}
