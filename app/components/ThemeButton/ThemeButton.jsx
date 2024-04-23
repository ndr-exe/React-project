'use client'

import { useState,useEffect } from "react"

import { CiDark } from "react-icons/ci";
import { GiBleedingEye } from "react-icons/gi";



export default function ThemeButton({dict}) {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(()=>{
        if(window.localStorage.getItem('darkMode') === null){
            if(window.matchMedia('(prefers-color-scheme: dark)').matches){
                document.body.classList.add('dark')
                setIsDarkMode(true)
                return
            }else {
                return
            }
        }else {
            if(window.localStorage.getItem('darkMode') === "true"){
                setIsDarkMode(true)
                document.body.classList.add('dark')
            }else {
                return
            }
        }


    },[])

    function handleThemeChange (){
        window.localStorage.setItem('darkMode',!isDarkMode)
        document.body.classList.toggle('dark')
        setIsDarkMode(prev => !prev)
    }


  return (
        <button onClick={handleThemeChange} className="text-xl ">
            {isDarkMode ? <span className="flex items-center text-yellow-400">{dict.options.light}<GiBleedingEye/></span> : <span className="flex items-center">{dict.options.dark}<CiDark/></span>}
         </button>
  )
}
