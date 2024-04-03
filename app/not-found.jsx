import Link from "next/link";

// Icon imports
import { TfiFaceSad } from "react-icons/tfi";



export default function NotFound() {
  return (
    <div className='bg-zinc-900 grid grid-rows-1 grid-cols-12 row-span-9'>
        <div className='col-span-9 bg-zinc-900  h-full border-r border-gray-700/50 flex items-center justify-center'>
            <h2 className="flex flex-col text-gray-400">
                <span className="text-6xl text-white"><TfiFaceSad/><span className="text-xl">OOPS!</span> </span>
               <span className="text-xl">YOU&apos;RE BEYOND THE BORDERS.</span> 
                <span className="text-2xl ">GO BACK TO <Link href="/" className="text-orange-600 hover:text-white" >HOMEPAGE</Link></span>
            </h2>
        </div>

        

        <div className='col-span-3 h-full px-7 flex flex-col items-start justify-end pb-28 '>
            <h2 className='text-4xl font-mono font-bold uppercase tracking-wider mb-4'>404 Page Not Found</h2>
            <p className='text-gray-400 font-serif'>
            HE who created the firmament, by that mighty power made beings inspired from on high with souls celestial; 
            to us men He has given the world, infinite in variety we possess it; from Him is every monarch in His likeness.
            </p>

        </div>
</div>
  )
}
