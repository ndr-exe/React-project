'use server'

import { cookies } from "next/headers"

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

