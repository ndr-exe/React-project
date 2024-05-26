'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function Navigation({dict}: {dict: DictType}) {
  
    const user = useUser()
    const pathname = usePathname()
  return (
            <ul className='flex items-center gap-4 ml-8 text-sm text-gray-500 dark:text-gray-100'> 
                <li><Link href="/marketplace" className={`link ${pathname.indexOf('/marketplace') !== -1 ? 'active' : ''}`}>{dict.navbar.marketplace}</Link></li>
                <li><Link href="/blog" className={`link ${pathname.indexOf('/blog') !== -1 ? 'active' : ''}`}>{dict.navbar.blog}</Link></li>
                <li><Link href="/contact" className={`link ${pathname.indexOf('/contact') !== -1 ? 'active' : ''}`}>{dict.navbar.contact}</Link></li>
                {
                  user.user && <li><Link href="/profile" className={`link ${pathname.indexOf('/profile') !== -1 ? 'active' : ''}`}>{dict.navbar.profile}</Link></li>
                }
                {/* <li><Link href="/profile" className={`link ${pathname.indexOf('/profile') !== -1 ? 'active' : ''}`}>{dict.navbar.profile}</Link></li> */}
            </ul>
  )
}
