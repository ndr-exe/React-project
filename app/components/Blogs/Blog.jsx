import React from 'react'
import Image from "next/image"
import Link from "next/link"

export default function Blog({title,uploadDate,body,important,image,id}) {
         if(important) return (
             <li className="col-span-8 h-full rounded-md overflow-hidden hover:bg-zinc-950 ">
                 <article className='w-full h-full flex flex-col'> 
                 <div className='h-[60%]'>
                     <Image src={image} alt="mariooo" width={900} height={225} className='h-full w-full'/>
                 </div>
                 <div className='px-6 pt-5 border border-t-0 border-blue-950 rounded-b-md flex flex-col justify-between h-full '>
                     <div className=''>
                     <h3 className='text-2xl mb-4'>{title}</h3>
                     <p className='text-sm text-gray-400'>{body} 
                     <br/>
                    <Link href={`blog/${id}`}>
                        <span className='text-orange-600 hover:text-gray-400' href="/">Read More...</span>
                     </Link>
                     </p>

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
                 <Image src={image} alt="mariooo" width={436} height={150} className='h-full w-full'/>
             </div>
             <div className='px-6 pt-5 border border-blue-950 border-t-0 rounded-b-md flex flex-col justify-between h-full '>
                 <div className=''>
                     <h3 className='text-xl mb-4'>{title}</h3>
                     <p className='text-sm text-gray-400'>{body} 
                    <Link href={`blog/${id}`}>
                    <span className='text-orange-600 ml-3 hover:text-gray-400' href="/">Read More...</span>
                    </Link> 
                     </p>
                 </div>
                 <p className='mb-3 text-gray-600'>{uploadDate}</p>
             </div>
             </article>
         </li>
             
         )

}
