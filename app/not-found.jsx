import Link from "next/link";

// Icon imports
import { TfiFaceSad } from "react-icons/tfi";



export default function NotFound() {
  return (
    <div className='h-full w-full grid place-content-center'>
        <div className='col-span-9 h-full flex items-center justify-center'>
            <h2 className="flex flex-col text-gray-400">
                <span className="text-6xl text-black"><TfiFaceSad/><span className="text-xl">OOPS!</span> </span>
               <span className="text-xl">YOU&apos;RE BEYOND THE BORDERS.</span> 
                <span className="text-2xl ">GO BACK TO <Link href="/home" className="text-orange-600 hover:text-orange-800" >HOMEPAGE</Link></span>
            </h2>
        </div>
</div>
  )
}
