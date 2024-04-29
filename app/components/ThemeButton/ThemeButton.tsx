'use client'

import { useState,useEffect } from "react"

import { CiDark } from "react-icons/ci";
import { GiBleedingEye } from "react-icons/gi";
import { setDarkMode } from "../funcs";


export default function ThemeButton({dict,theme} : {dict: DictType, theme: boolean}) {
    const [isDarkMode, setIsDarkMode] = useState(theme)
    
    
    useEffect(()=>{

        //USER THAT HASN'T CHANED THEME YET USE SYSTEM SETTINGS
        if(document.body.classList.contains('system')){

            if(window.matchMedia('(prefers-color-scheme: dark)').matches){
                console.log("you're system is set to  *DARK MODE*")
                document.documentElement.classList.add('dark')
                setIsDarkMode(true)
                return       
            }
        }
        
        },[])


     async function handleThemeChange (){
        if(document.body.classList.contains('system')) document.body.classList.remove('system')
        console.log(document)
        document.documentElement.classList.toggle('dark')
        await setDarkMode('darkMode',!isDarkMode)
        setIsDarkMode(prev => !prev)
    }


  return (
        <button onClick={handleThemeChange} className="text-xl ">
            {isDarkMode ? <span className="flex items-center text-yellow-400">{dict.options.light}<GiBleedingEye/></span> : <span className="flex items-center">{dict.options.dark}<CiDark/></span>}
         </button>
  )
}
