import ThemeBtnWrapper from '../ThemeButton/ThemeBtnWrapper'
import Navigation from './Navigation'
import LangBtnWrapper from "../LangBtn/LangBtnWrapper"
import Cart from "../Marketplace/Cart"
import { getSession } from "@auth0/nextjs-auth0"


export default async function Navbar({dict}: {dict: DictType}) {

    const session = await getSession();


  return (
    <nav className='w-full h-full flex'>

        <h1 className='flex items-center text-2xl pl-8 dark:text-gray-100'>fast <span className="text-orange-600">LAG</span>.</h1>

            <Navigation dict={dict}/>
            {/* <ul className='flex gap-8 ml-auto'>
                <li className='pl-6 flex items-center '><a href="/api/auth/login">Sign in</a></li>
                <li className='pr-6 flex items-center text-orange-600'><a href="/">Sign up</a></li>
            </ul> */}
            <ul className='flex ml-auto items-center'>
                <li className="flex items-center mt-3">
                    <Cart/>
                </li>
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
                 {session   
                ? <a href="/api/auth/logout" className='hover:text-orange-600 font-bold dark:text-gray-100'>{dict.options.logout}</a>
                : (<a href="/api/auth/login" className="hover:text-orange-600 font-bold dark:text-gray-100">{dict.options.login}</a>) }
            </li>
            
            </ul>
        </nav>
  )
}
