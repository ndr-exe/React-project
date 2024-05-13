'use client'

import Image from "next/image"
import Link from "next/link"


export default function Item({title,price,brand,thumbnail,id,dict,handleClick} : ItemPorpsType) {

  return (
    <div>
    {/* // <Link href={`marketplace/${id}`} className=""> */}
        <div className="w-full h-full group shadow-sm border border-gray-300 rounded-xl overflow-hidden">
            <div className=""> 
                <Image src={thumbnail} alt="" width={250} height={150} className="w-[250px] h-[150px] mx-auto"/>
            </div>
            <div className="text-left px-3 pt-4 pb-3 flex flex-col justify-between h-[calc(100%-150px)]">
                <div>
                   <Link href={`marketplace/${id}`} className="">
            <p className="text-xl text-gray-900 font-bold group-hover:text-orange-600 transition-colors dark:text-gray-100">{title}</p>
                  </Link>
                <p className="text-gray-400 text-sm">{brand}</p>
                </div>
                <div>
                <p className="text-gray-800 text-md font-bold mb-1 dark:text-gray-100">${price}</p>
                <button onClick={()=>handleClick({title,price,brand,thumbnail,id})} className="bg-transparent relative pl-3 pr-2 before:content-[''] before:h-full before:w-full before:absolute before:-left-[95%] hover:before:translate-x-[95%] before:duration-300 overflow-hidden before:bg-orange-600 before:-z-10 dark:text-gray-100"><span className="z-20 bg-transparent">{dict.product.addToCart}</span></button>
                </div>
            </div>
        </div>
    {/* // </Link> */}
    </div>
  )
}

