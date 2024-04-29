'use client'

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { handleLangChange } from './funcs';


export default function LocalSwitcher() {

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const path = usePathname()
  const start = path.slice(1,3)
  const end = path.slice(4)


  let activeEng = ''
  let activeGe = ''

  if(start === "en") {
    activeEng = "bg-gray-400/70 rounded-xl"
    activeGe = "text-opacity-50 opacity-50"
  }else{
    activeEng = "text-opacity-50 opacity-50"
    activeGe = "bg-gray-400/70 rounded-xl"
  }

  function handleClick(lang: string) {
    const nextLocale = lang
    handleLangChange(lang)
    startTransition(() => {
        router.replace(`/${nextLocale}/${end}`);
      });
        
  }

  return (
    <div className='mr-4 text-xl border border-gray-800 rounded-xl overflow-hidden py-1 px-1'>
        <button className={`${activeEng} px-2`} onClick={()=>handleClick("en")}>🇬🇧</button>
        <button className={`${activeGe} ml-3 px-2`} onClick={()=>handleClick("ge")}>🇬🇪</button>
    </div>
  )
}