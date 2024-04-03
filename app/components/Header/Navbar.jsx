'use client'

import { usePathname } from 'next/navigation'
import Link from "next/link"

export default function Navbar() {
    const pathname = usePathname()

  return (

    <nav className='w-full h-full grid grid-rows-1 grid-cols-12 '>

        <h1 className='text-white flex items-center text-2xl pl-8'>fast <span className="text-orange-600">LAG</span>.</h1>

            <ul className='flex items-center gap-4 ml-8 text-sm text-gray-500'> 
                <li><Link href="/" className={`link ${pathname === '/' ? 'active' : ''}`}>Marketplace</Link></li>
                <li><Link href="/blog" className={`link ${pathname === '/blog' ? 'active' : ''}`}>Blog</Link></li>
                <li><Link href="/contact" className={`link ${pathname === '/contact' ? 'active' : ''}`}>Contact</Link></li>
                <li><Link href="/profile" className={`link ${pathname === '/profile' ? 'active' : ''}`}>Profile</Link></li>
            </ul>
            <ul className='flex justify-between  border-x border-gray-700/50 col-start-9 col-end-11'>
                <li className='pl-6 flex items-center '><a href="/">Sign in</a></li>
                <li className='pr-6 flex items-center text-orange-600'><a href="/">Sign up</a></li>
            </ul>
        </nav>
  )
}
