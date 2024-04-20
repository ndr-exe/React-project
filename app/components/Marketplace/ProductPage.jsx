'use client'

import { useEffect,useState } from "react"
import Image from "next/image"

export default function ProdcutPage({params}) {
    const [product,setProduct] = useState(null)

    useEffect(()=>{
        async function fetchProduct(){
            const res = await fetch(`https://dummyjson.com/products/${params.product}`)
            const product = await res.json()
            setProduct(product)
        }

        fetchProduct()

    },[])

  return (
    product ? 
    (
    <div className=" px-[50px] pt-10 relative ">
            <div className="flex justify-between gap-4">
                <div className="rounded-lg overflow-hidden">
                <Image src={product.images[0]} alt="product" width={650} height={370} className="w-[650px] h-[370px]"/>
                </div>
                <div className="flex flex-col justify-between ">
                    <div>
                    <p className="text-gray-500 before:content-[''] before:w-[3px] before:h-[100%] before:bg-orange-400/80 relative before:absolute before:-left-0 pl-4  ">{product.brand}</p>
                    <p className="mt-8 text-3xl font-bold tracking-wide dark:text-gray-300">{product.title}</p>
                    <p className="mt-4 text-lg text-gray-800 dark:text-gray-400">{product.description}</p>
                    </div>
                    <div className="mb-6">
                    <p className="text-3xl text-gray-900 font-bold mb-5 dark:text-gray-300 ">${product.price}</p>
                    <button className="text-white text-2xl py-3 rounded-xl bg-orange-600 w-full">Add to cart</button>
                    </div>
                </div>
              
            </div>

            <p className="mt-12 text-gray-400 italic"> 
                <span className="text-gray-500 not-italic">*Terms and Conditions : </span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat in incidunt modi quas nostrum. 
                Repellat assumenda expedita officiis, omnis sunt ratione possimus, exercitationem, optio veniam tempora eos maiores repudiandae magnam.
            </p>
    </div>
    ) : <div className="h-full w-full grid place-content-center">Loading...</div>
  )
}
