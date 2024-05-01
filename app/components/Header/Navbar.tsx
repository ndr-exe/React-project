// import { useRouter, usePathname } from 'next/navigation'
import Link from "next/link"
// import { logout } from '../funcs'
// import { useEffect, useState } from 'react'
// import ThemeButton from '../ThemeButton/ThemeButton'

import ThemeBtnWrapper from '../ThemeButton/ThemeBtnWrapper'
import Navigation from './Navigation'
import LangBtnWrapper from "../LangBtn/LangBtnWrapper"


export default function Navbar({dict}: {dict: DictType}) {

    // const pathname = usePathname()
    // const router = useRouter()    

  return (
    <nav className='w-full h-full flex'>

        <h1 className='flex items-center text-2xl pl-8 dark:text-gray-100'>fast <span className="text-orange-600">LAG</span>.</h1>

            <Navigation dict={dict}/>
            {/* <ul className='flex gap-8 ml-auto'>
                <li className='pl-6 flex items-center '><a href="/">Sign in</a></li>
                <li className='pr-6 flex items-center text-orange-600'><a href="/">Sign up</a></li>
            </ul> */}
            <ul className='flex ml-auto items-center'>
                <li>
                <LangBtnWrapper/>
                </li>
            <li className='pr-4'>
                <ThemeBtnWrapper dict={dict}/>
            </li>
            <li className='text-lg pr-6 '>
                {/* <button 
                onClick={()=> {
                    logout()
                    router.refresh()
                    }}>{dict.options.logout}
                 </button> */}
                 <Link href="/api/logout" className='hover:text-orange-600 font-bold dark:text-gray-100'>{dict.options.logout}</Link>
            </li>
            
            </ul>
        </nav>
  )
}
