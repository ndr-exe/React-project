'use server'

import { cookies } from "next/headers"

export async function logout(){
  cookies().delete('token')
}

export async function handleLangChange(lang){
  cookies().set('locale',lang)
}

export async function checkLocaleLang(){
 const lang =  cookies().get('locale')
 if(!lang) return 'en'
 return lang.value
}