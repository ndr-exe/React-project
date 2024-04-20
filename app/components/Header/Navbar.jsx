'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from "next/link"
import { logout } from '../funcs'
import { useEffect, useState } from 'react'
import ThemeButton from '../ThemeButton/ThemeButton'


export default function Navbar() {

    const pathname = usePathname()
    const router = useRouter()


    

  return (
    <nav className='w-full h-full flex'>

        <h1 className='flex items-center text-2xl pl-8 dark:text-gray-100'>fast <span className="text-orange-600">LAG</span>.</h1>

            <ul className='flex items-center gap-4 ml-8 text-sm text-gray-500 dark:text-gray-100'> 
                <li><Link href="/home/" className={`link ${pathname === '/home' ? 'active' : ''}`}>Marketplace</Link></li>
                <li><Link href="/home/blog" className={`link ${pathname === '/home/blog' ? 'active' : ''}`}>Blog</Link></li>
                <li><Link href="/home/contact" className={`link ${pathname === '/home/contact' ? 'active' : ''}`}>Contact</Link></li>
                <li><Link href="/home/profile" className={`link ${pathname === '/home/profile' ? 'active' : ''}`}>Profile</Link></li>
            </ul>
            {/* <ul className='flex gap-8 ml-auto'>
                <li className='pl-6 flex items-center '><a href="/">Sign in</a></li>
                <li className='pr-6 flex items-center text-orange-600'><a href="/">Sign up</a></li>
            </ul> */}
            <ul className='flex ml-auto items-center'>
            <li className='pr-4'>
                <ThemeButton/>
            </li>
            <li className='text-lg pr-6 hover:text-orange-600 font-bold dark:text-gray-100'>
                <button 
                onClick={()=> {
                    logout()
                    router.refresh()
                    }}>Log out
                 </button>
            </li>
            
            </ul>
        </nav>
  )
}
