'use client'

import { useState } from "react"

export default function DropDown({handleSort,isSorted,dict}) {
    const [active,setActive] = useState(false)
    const [sortingTag,setSortingTag] = useState('')


    
    const activeClass = !active ? 'hidden' : 'block'
    const activeSortBtn = isSorted ? " text-orange-500" : "text-black dark:text-gray-100"

    
    function checkIfIsSorted(param){
        return isSorted === param ? " text-orange-500" : ""
    }

    function handleClick(){
        setActive(!active)
        // isSorted && active && handleSort('default')
    }


  return (
<>
{/* overlay for Sort-By dropwdown */}
<div 
onClick={() => setActive(false)}
className={"absolute w-full h-screen right-0 top-0 " + activeClass} >
</div>


<div className="relative inline-block text-left text-black ">
  <div className="w-[150px]">
    <button 
    onClick={handleClick} 
    className={"inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-md" + activeSortBtn}
    id="menu-button">
     {isSorted ? sortingTag : dict.filters.sort}
      <svg className="-mr-1 h-5 w-5 text-white-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
      </svg>
    </button>
  </div>

  <div className={"bg-gray-200 absolute right-[50%] translate-x-[50%] z-10 mt-4 w-56 origin-top-right rounded-md shadow-lg "  + activeClass} role="menu">
    <div className="py-1 flex flex-col items-center" >
        <button 
            onClick={()=> isSorted !== "price-ASC" ? (handleSort("price-ASC") , setSortingTag(dict.filters.asc)) : handleSort('default')} 
            className={"block w-full px-4 py-2 text-sm" + checkIfIsSorted('price-ASC')  } >
            {dict.filters.prizeAsc}
        </button>

        <button 
            onClick={()=> isSorted !== "price-DESC" ? (handleSort("price-DESC"), setSortingTag(dict.filters.desc)) : handleSort('default')} 
            className={"block w-full px-4 py-2 text-sm" + checkIfIsSorted('price-DESC')  } >
            {dict.filters.prizeDesc}
            </button>
    </div>
  </div>
</div>
</>
  )
}
