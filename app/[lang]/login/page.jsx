// import { redirect } from 'next/navigation'
// import {cookies} from 'next/headers'
import ThemeButton from '../../components/ThemeButton/ThemeButton'
import LangBtn from '../../components/LangBtn'
import { getDictionary } from '../dictionaries'
import Link from 'next/link'


 //USING ROUTE HANDLERS FOR LOGIN / LOGOUT LOGIC INSTEAD OF SERVER ACTIONS
 // **THAT WILL RESULT PAGE REFRESH ON LOGIN**
 
  // async function handleLogIng(formData){
  //   'use server'
  //  const rawFormData = Object.fromEntries(formData)
  //  const userName = rawFormData.name
  //  const userPass = rawFormData.pass
   
  //   const response = await fetch('https://dummyjson.com/auth/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
        
  //       username: userName,
  //       password: userPass,
  //     })
  //   })

  //   const user = await response.json()
  //   if(user.message) return 'invalid username'

  //   cookies().set('token',user.token)

  //   if(user.token) redirect('/home')
 
  // }

  export default async function Home({children, params:{lang}}) {

  const dict = await getDictionary(lang)

  return (
    
    <div className='w-full h-[80%] text-3xl grid place-content-center relative'>
      <div className='absolute top-0 w-[400px] border bg-gray-200 text-lg dark:text-black'>
       <p>Dummyjson users examples:</p>
       <p><span className='text-indigo-400'>user:</span> nloiterton8 <span className='text-indigo-400'>pass:</span> HTQxxXV9Bq4</p>
       <p><span className='text-indigo-400'>user:</span> rhallawellb <span className='text-indigo-400'>pass:</span> esTkitT1r</p>
       <p><span className='text-indigo-400'>user:</span> aeatockj <span className='text-indigo-400'>pass:</span> szWAG6hc</p>
      </div>
      <div className='absolute top-4 right-5 flex gap-4'>
        <LangBtn/>
        <ThemeButton dict={dict}/>
      </div>
      <form className="flex flex-col border border-gray-400 px-4 py-3 rounded-md relative" action='api/login' method='post'  >
        
        <input required type="text" name="name" id="" placeholder={dict.login.usernameHolder} className='py-4 px-3 bg-slate-300/80 mb-4 rounded-md dark:placeholder:text-gray-700' />
        <input required type="text" name="pass" id="" placeholder={dict.login.passwordHolder} className='py-4 px-3 bg-slate-300/80 rounded-md dark:placeholder:text-gray-700' />
        <button className='mt-5 w-full hover:text-orange-600'>{dict.login.login}</button>
      </form>
    </div>
  )
}


