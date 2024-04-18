import { redirect } from 'next/navigation'
import {cookies} from 'next/headers'

  async function handleLogIng(formData){
    'use server'
   const rawFormData = Object.fromEntries(formData)
   const userName = rawFormData.name
   const userPass = rawFormData.pass
   
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        
        username: userName,
        password: userPass,
      })
    })

    const user = await response.json()
    if(user.message) return 'invalid username'

    cookies().set('token',user.token)

    if(user.token) redirect('/home')
 
  }



  export default function Home() {

  return (
    
    <div className='w-full h-[80%] text-3xl grid place-content-center relative'>
      <div className='absolute top-0 w-[400px] border bg-gray-200 text-lg'>
       <p>Dummyjson users examples:</p>
       <p><span className='text-indigo-400'>user:</span> nloiterton8 <span className='text-indigo-400'>pass:</span> HTQxxXV9Bq4</p>
       <p><span className='text-indigo-400'>user:</span> rhallawellb <span className='text-indigo-400'>pass:</span> esTkitT1r</p>
       <p><span className='text-indigo-400'>user:</span> aeatockj <span className='text-indigo-400'>pass:</span> szWAG6hc</p>



      </div>
      <form className="flex flex-col border border-gray-400 px-4 py-3 rounded-md" action={handleLogIng}  >
        
        <input required type="text" name="name" id="" placeholder='Username' className='py-4 px-3 bg-slate-300/80 mb-4 rounded-md' />
        <input required type="text" name="pass" id="" placeholder='Password' className='py-4 px-3 bg-slate-300/80 rounded-md' />
        <button className='mt-5 w-full hover:text-orange-600'>Log in</button>
      </form>
    </div>
  )
}


