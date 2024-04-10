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
    <div className="text-white px-[200px] relative ">
            <h1 className="text-5xl bold absolute left-[50%] translate-x-[-50%]">
                {product.title}
            </h1>
            <div className="flex pt-6">
                <div className="flex-1">
                    <div className="pt-12 overflow-hidden">
                        <Image src={product.images[0]} alt="product" width={400} height={300} className="w-[400px] h-[400px]"/>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="bg-slate-800 pt-[100px] pb-10 px-8">
                        <p className="text-2xl mb-8">{product.description}</p>
                        <p className="text-2xl text-gray-500 mb-6 italic">Price: <span className="text-white text-3xl not-italic">{product.price}$</span></p>
                        <div className="flex justify-between">
                            <button className="px-5 py-3 text-2xl border hover:bg-white hover:text-black hover:border-black">ADD TO CART</button>
                            <button className="px-5 py-3 text-2xl border text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white">BUY NOW</button>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="flex justify-around mt-11"> 
                <li className="flex flex-col gap-2 py-3 w-[18%] px-6 items-center rounded-lg bg-slate-900 text-gray-500 italic">Brand: 
                <span className="not-italic text-white text-lg">{product.brand}</span>
                </li>
                <li className="flex flex-col gap-2 py-3 w-[18%] px-6 items-center rounded-lg bg-slate-950 text-gray-500 italic">Category: 
                <span className="not-italic text-white text-lg">{product.category}</span>
                </li>
                <li className="flex flex-col gap-2 py-3 w-[18%] px-6 items-center rounded-lg bg-slate-900 text-gray-500 italic">Rating: 
                <span className="not-italic text-white text-lg">{product.rating}</span>
                </li>
                <li className="flex flex-col gap-2 py-3 w-[18%] px-6 items-center rounded-lg bg-slate-950 text-gray-500 italic">Stock: 
                <span className="not-italic text-white text-lg">{product.stock}</span>
                </li>
            </ul>
            <p className="mt-12 text-gray-400 italic"> 
                <span className="text-gray-500 not-italic">*Terms and Conditions : </span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat in incidunt modi quas nostrum. 
                Repellat assumenda expedita officiis, omnis sunt ratione possimus, exercitationem, optio veniam tempora eos maiores repudiandae magnam.
            </p>
    </div>
    ) : <div className="h-full w-full grid place-content-center">Loading...</div>
  )
}
