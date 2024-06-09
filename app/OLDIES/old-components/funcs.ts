'use server'

import { cookies } from "next/headers"
import { BASE_URL, getUsers } from "../../api"
import { revalidatePath } from "next/cache"
import { getSession } from "@auth0/nextjs-auth0"


export async function logout(){
  cookies().delete('token')
}

export async function handleLangChange(lang: string){
  cookies().set('locale',lang)
}

export async function checkLocaleLang(){
 const lang =  cookies().get('locale')
 if(!lang) return 'en'
 return lang.value
}

export async function setDarkMode(mode: string, state: boolean){
  cookies().set(mode,state.toString())
}


export async function getThemeInfo(){
  const theme = cookies().get("darkMode")
  if(typeof theme === "undefined") return false
  return theme.value === 'true' ? true : false

}

export async function updateCart(cart: CartProducts){
  const session = await getSession()
  let sub
  if(session && session.user) sub = session.user.sub


  const response = await fetch(`${BASE_URL}/api/update-cart`,{method: "PUT",body: JSON.stringify(cart), headers:{Authorization: sub } })
  revalidatePath('/','layout')
}


