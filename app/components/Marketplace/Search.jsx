//ICON IMPORTS
// import { FaSearch } from "react-icons/fa";

import { FiSmartphone } from "react-icons/fi";
import { GiLaptop } from "react-icons/gi";
import { GiFragrance } from "react-icons/gi";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { IoBodyOutline } from "react-icons/io5";



import CategoryButton from "./CategoryButton";
import DropDown from "./DropDown";



export default function Search({handleFilter,handleSearch,activeFilter,handleSort,isSorted}) {

  //Debouncing logic
  let searchTimeout

  function handleChange(query) {
    clearTimeout(searchTimeout)
    if(!query) return handleSearch('empty')
    
    searchTimeout = setTimeout(()=>{
      console.log("-->",query)
      handleSearch(query)
    },500)
    
  }

  function handleSubmit(e){
    e.preventDefault()
  }


  return (
    <div className='flex items-center gap-5 px-8 '>
      <form onSubmit={handleSubmit} >
       <ul className="flex gap-7 text-md">
        <li className=" outline-neutral-400 outline-1">
          <CategoryButton 
          handleFilter={handleFilter} filter="smartphones" activeFilter={activeFilter} ><FiSmartphone/>Smartphones</CategoryButton>
          </li>
        <li className="">
          <CategoryButton handleFilter={handleFilter} filter="laptops" activeFilter={activeFilter} ><GiLaptop/>Laptops</CategoryButton>
          </li>
        <li className="">
          <CategoryButton handleFilter={handleFilter} filter="fragrances" activeFilter={activeFilter}><GiFragrance/>Fragrances</CategoryButton>
          </li>
        <li className="">
          <CategoryButton handleFilter={handleFilter} filter="skincare" activeFilter={activeFilter}><IoBodyOutline/>Skincare</CategoryButton>
          </li>
        <li className="">
          <CategoryButton handleFilter={handleFilter} filter="groceries" activeFilter={activeFilter}><MdOutlineLocalGroceryStore/>Groceries</CategoryButton>
          </li>

      </ul>
      </form>
 
      <DropDown handleSort={handleSort} isSorted={isSorted}/>
      
    <form action="/" className='text-xl flex items-center gap-3 ml-auto '>
        <input 
        onChange={e => handleChange(e.target.value)}
        className='px-2 py-1 outline-none rounded-lg block placeholder:text-gray-500 placeholder:text-md border border-black'
         type="text" name="search" id="" placeholder='Search All Products ..' />
        {/* <button type="submit" className="text-blue-900 text-3xl block">
            <FaSearch/>
        </button> */}
    </form>
</div>
  )
}
