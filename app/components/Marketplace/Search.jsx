//ICON IMPORTS
// import { FaSearch } from "react-icons/fa";
import { FaGun } from "react-icons/fa6";
import { BiRun } from "react-icons/bi";
import { FaCarCrash } from "react-icons/fa";
import { SiApplearcade } from "react-icons/si";
import { GiSwordInStone } from "react-icons/gi";
import CategoryButton from "./CategoryButton";
import DropDown from "./DropDown";



export default function Search({handleFilter:handleClick,handleSearch,filters,handleSort,isSorted}) {

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

  function checkForActiveFilter(filter){
    return filters.indexOf(filter) !== -1
  }

  return (
    <div className='flex items-center gap-5 justify-center'>
      <form onSubmit={handleSubmit} >
       <ul className="flex gap-7 text-lg">
        <li className="">
          <CategoryButton 
          handleClick={handleClick} filter="Action" active={checkForActiveFilter('Action')} ><BiRun/> Action</CategoryButton>
          </li>
        <li className="">
          <CategoryButton handleClick={handleClick} filter="Shooter" active={checkForActiveFilter('Shooter')} ><FaGun/>Shooter</CategoryButton>
          </li>
        <li className="">
          <CategoryButton handleClick={handleClick} filter="Racing" active={checkForActiveFilter('Racing')} ><FaCarCrash/>Racing</CategoryButton>
          </li>
        <li className="">
          <CategoryButton handleClick={handleClick} filter="Arcade" active={checkForActiveFilter('Arcade')} ><SiApplearcade/>Arcade</CategoryButton>
          </li>
        <li className="">
          <CategoryButton handleClick={handleClick} filter="Advanture" active={checkForActiveFilter('Advanture')} ><GiSwordInStone/>Advanture</CategoryButton>
          </li>

      </ul>
      </form>
 
      <DropDown handleSort={handleSort} isSorted={isSorted}/>
      
    <form action="/" className='text-xl flex items-center gap-3 '>
        <input 
        onChange={e => handleChange(e.target.value)}
        className='bg-blue-950 px-4 py-3 outline-none rounded-lg block placeholder:text-gray-500 '
         type="text" name="search" id="" placeholder='Search All Games ..' />
        {/* <button type="submit" className="text-blue-900 text-3xl block">
            <FaSearch/>
        </button> */}
    </form>
</div>
  )
}

