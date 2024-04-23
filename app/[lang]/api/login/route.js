import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export  async function POST(request){
  const formData = await request.formData()
  const name = formData.get('name')
  const pass = formData.get('pass')


  const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: name,
        password: pass,
      })
    })

  const user = await response.json()
  
  if(user.message) return redirect('/login')
  
  const oneDay = 24 * 60 * 60 * 1000
  cookies().set('token', user.token, { expires: Date.now() + oneDay })

  return redirect('/marketplace')
 
  }