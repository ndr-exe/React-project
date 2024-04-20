'use client'

import { useState,useEffect } from "react"

import { CiDark } from "react-icons/ci";
import { GiBleedingEye } from "react-icons/gi";



export default function ThemeButton() {
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
                console.log(window.localStorage.getItem('darkMode') === true)
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
            {isDarkMode ? <span className="flex items-center text-yellow-400">LGHT<GiBleedingEye/></span> : <span className="flex items-center">DRK<CiDark/></span>}
         </button>
  )
}
