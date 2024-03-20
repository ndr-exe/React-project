import { FaSearch } from "react-icons/fa";


export default function Search() {
  return (
    <div className='row-span-2 flex items-center justify-center'>
    <form action="/" className='text-xl flex items-center gap-3 '>
        <input className='bg-blue-950 px-4 py-3 outline-none rounded-lg block placeholder:text-gray-500 '
         type="text" name="search" id="" placeholder='Search for Games..' />
        <button type="submit" className="text-blue-900 text-3xl block">
            <FaSearch/>
        </button>
    </form>
</div>
  )
}
