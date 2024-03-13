import { Bars3Icon } from "@heroicons/react/24/outline"

export default function Navbar(){
    return (
        <nav className="w-screen h-[80px] z-10 bg-sky-700 fixed drop-shadow-md">
        <div className="px-2 flex justify-between items-center w-full h-full">
          <div className="flex items-center">
            <h1 className="text-3xl font-sans text-orange-400 font-bold mr-4 sm:text-4xl">SOLARIS</h1>
            <ul className="hidden md:flex text-white">
              <li><a className="ho" href="#">Home</a></li>
              <li><a className="ho" href="#">About</a></li>
              <li><a className="ho" href="#">How We Work</a></li>
              <li><a className="ho" href="#">Features</a></li>
              <li><a className="ho" href="#">Kits</a></li>
            </ul>
          </div>
          <div className="hidden md:flex pr-4">
            <button className="border-none bg-transparent text-white mr-4">Sign In</button>
            <button className="px-8 py-3">Sign Up</button>
          </div>
  
          <div className="md:hidden mr-4">
  
        <Bars3Icon className="w-5"/>
          </div>
  
        </div>
      </nav>
    )
}