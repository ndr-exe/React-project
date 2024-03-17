
export default function Navbar({logo}) {
  return (

    <nav className='w-full h-full grid grid-rows-1 grid-cols-12 '>

        <h1 className='text-white flex items-center text-2xl pl-8'>fast <span className="text-orange-600">LAG</span>.</h1>

            <ul className='flex items-center gap-4 ml-8 text-sm text-gray-500'> 
                <li><a href="/">Home</a></li>
                <li><a href="/">Marketplace</a></li>
                <li><a href="/">About</a></li>
            </ul>
            <ul className='flex justify-between  border-x border-gray-700/50 col-start-9 col-end-11'>
                <li className='pl-6 flex items-center '><a href="/">Sign in</a></li>
                <li className='pr-6 flex items-center text-orange-600'><a href="/">Sign up</a></li>
            </ul>
        </nav>
  )
}
