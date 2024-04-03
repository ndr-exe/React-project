import React from 'react'
import Image from "next/image"

export default function Blog({title,uploadDate,description,important,image}) {
         if(important) return (
             <li className="col-span-8 h-full rounded-md overflow-hidden hover:bg-zinc-950 ">
                 <article className='w-full h-full flex flex-col'> 
                 <div className='h-[60%]'>
                     <Image src={image} alt="mariooo" className='h-full w-full' priority={true} placeholder='blur' />
                 </div>
                 <div className='px-6 pt-5 border border-t-0 border-blue-950 rounded-b-md flex flex-col justify-between h-full '>
                     <div className=''>
                     <h3 className='text-2xl mb-4'>{title}</h3>
                     <p className='text-sm text-gray-400'>{description} <br/><a className='text-orange-600' href="/">Read More...</a></p>

                     </div>
                     <p className='mb-3 text-gray-600'>{uploadDate}</p>

                 </div>
                 </article>
             </li>
         )

         return (
             <li className="col-span-4 h-full rounded-md overflow-hidden hover:bg-zinc-950 hover:cursor-pointer">
             <article className='w-full h-full flex flex-col'> 
             <div className='bg-teal-300'>
                 <Image src={image} alt="mariooo" className='h-[150px] w-auto'/>
             </div>
             <div className='px-6 pt-5 border border-blue-950 border-t-0 rounded-b-md flex flex-col justify-between h-full '>
                 <div className=''>
                     <h3 className='text-xl mb-4'>{title}</h3>
                     <p className='text-sm text-gray-400'>{description} <a className='text-orange-600 ml-3' href="/">Read More...</a></p>
                 </div>
                 <p className='mb-3 text-gray-600'>{uploadDate}</p>
             </div>
             </article>
         </li>
             
         )

}
