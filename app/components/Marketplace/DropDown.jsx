'use client'

import { useState } from "react"

export default function DropDown({handleSort,isSorted}) {
    const [active,setActive] = useState(false)
    const [sortingTag,setSortingTag] = useState('')


    
    const activeClass = !active ? 'hidden' : 'block'
    const activeSortBtn = isSorted ? " bg-orange-800" : " bg-slate-800"

    
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
className={"absolute bg-transparent w-full h-screen right-0 top-0 " + activeClass} >
</div>


<div className="relative inline-block text-left text-white ">
  <div className="w-[150px]">
    <button 
    onClick={handleClick} 
    className={"inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-orange-800 hover:bg-orange-800" + activeSortBtn}
    id="menu-button">
     {isSorted ? sortingTag : 'Sort By'}
      <svg className="-mr-1 h-5 w-5 text-white-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
      </svg>
    </button>
  </div>

  <div className={"absolute right-[50%] translate-x-[50%] z-10 mt-4 w-56 origin-top-right rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none "  + activeClass} role="menu">
    <div className="py-1 flex flex-col items-center" >
        <button 
            onClick={()=> isSorted !== "price-ASC" ? (handleSort("price-ASC") , setSortingTag("Price Asc.")) : handleSort('default')} 
            className={"hover:text-white text-gray-500 block w-full px-4 py-2 text-sm" + checkIfIsSorted('price-ASC')  } >
            Price ascending
        </button>

        <button 
            onClick={()=> isSorted !== "price-DESC" ? (handleSort("price-DESC"), setSortingTag("Price Desc.")) : handleSort('default')} 
            className={"hover:text-white text-gray-500 block w-full px-4 py-2 text-sm" + checkIfIsSorted('price-DESC')  } >
            Price descending
            </button>
    </div>
  </div>
</div>
</>
  )
}
