'use client'

import { useRouter } from 'next/navigation';
import { handleLangChange } from '../funcs';


export default function LocalSwitcher({lang}: {lang: string}) {

  const router = useRouter();

  let activeEng = ''
  let activeGe = ''

  if(lang === "en") {
    activeEng = "bg-gray-400/70 rounded-xl"
    activeGe = "text-opacity-50 opacity-50"
  }else{
    activeEng = "text-opacity-50 opacity-50"
    activeGe = "bg-gray-400/70 rounded-xl"
  }

  function handleClick(lang: string) {
    handleLangChange(lang)
    router.refresh()
  }

  return (
    <div className='mr-4 text-xl border border-gray-800 rounded-xl overflow-hidden py-1 px-1'>
        <button className={`${activeEng} px-2`} onClick={()=>handleClick("en")}>🇬🇧</button>
        <button className={`${activeGe} ml-3 px-2`} onClick={()=>handleClick("ge")}>🇬🇪</button>
    </div>
  )
}