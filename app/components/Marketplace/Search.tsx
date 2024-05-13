//ICON IMPORTS
// import { FaSearch } from "react-icons/fa";

import { FiSmartphone } from "react-icons/fi";
import { GiLaptop } from "react-icons/gi";
import { GiFragrance } from "react-icons/gi";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { IoBodyOutline } from "react-icons/io5";


import CategoryButton from "./CategoryButton";
import DropDown from "./DropDown";

import { FormEvent } from "react";
import Cart from "./Cart";
import dynamic from "next/dynamic";

type SearchProps = {
  handleFilter: Function,
  handleSearch: Function,
  handleSort: Function,
  dict: DictType,
  isSorted: boolean,
  activeFilter: string,
  cartProducts: number
}
const NoSSR = dynamic(() => import('../../components/Marketplace/Cart'), { ssr: false })


export default function Search({handleFilter,handleSearch,activeFilter,handleSort,isSorted,dict,cartProducts}: SearchProps) {

  //Debouncing logic
  let searchTimeout: ReturnType<typeof setTimeout> | undefined

  function handleChange(query: string) {
    clearTimeout(searchTimeout)
    if(!query) return handleSearch('empty')
    
    searchTimeout = setTimeout(()=>{
      console.log("-->",query)
      handleSearch(query)
    },500)
    
  }

  function handleSubmit(e:  FormEvent<HTMLFormElement>){
    e.preventDefault()
  }


  return (
    <div className='flex items-center gap-5 px-8 '>
      <form onSubmit={(e)=>handleSubmit(e)} >
       <ul className="flex gap-5 text-md">
        <li className=" outline-neutral-400 outline-1">
          <CategoryButton 
          handleFilter={handleFilter} filter="smartphones" activeFilter={activeFilter} ><FiSmartphone/>{dict.filters.smartphones}</CategoryButton>
          </li>
        <li className="">
          <CategoryButton handleFilter={handleFilter} filter="laptops" activeFilter={activeFilter} ><GiLaptop/>{dict.filters.laptops}</CategoryButton>
          </li>
        <li className="">
          <CategoryButton handleFilter={handleFilter} filter="fragrances" activeFilter={activeFilter}><GiFragrance/>{dict.filters.fragrance}</CategoryButton>
          </li>
        <li className="">
          <CategoryButton handleFilter={handleFilter} filter="skincare" activeFilter={activeFilter}><IoBodyOutline/>{dict.filters.skincare}</CategoryButton>
          </li>
        <li className="">
          <CategoryButton handleFilter={handleFilter} filter="groceries" activeFilter={activeFilter}><MdOutlineLocalGroceryStore/>{dict.filters.groceries}</CategoryButton>
          </li>

      </ul>
      </form>
 
      <DropDown handleSort={handleSort} isSorted={isSorted} dict={dict}/>
      
    <form action="/" className='text-xl flex items-center gap-2 ml-auto '>
        <input 
        onChange={e => handleChange(e.target.value)}
        className='px-1 py-1 outline-none rounded-xl block placeholder:text-gray-500 placeholder:text-md border border-black dark:bg-gray-400 dark:placeholder:text-gray-800 placeholder:text-lg'
         type="text" name="search" id="" placeholder={`${dict.filters.searchPlaceholder}...`} />
        {/* <button type="submit" className="text-blue-900 text-3xl block">
            <FaSearch/>
        </button> */}
    </form>
    <NoSSR cartProducts={cartProducts}/>
</div>
  )
}
