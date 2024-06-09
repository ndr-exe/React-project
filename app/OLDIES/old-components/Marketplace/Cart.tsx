'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useAppInfo } from "../Context-Provaiders/AppProvider";
import { calculateProductsCountInCart } from "../../../helperFunctions";


export default function Cart() {
// const [count,setCount] = useState(0)

// useEffect(()=>{
//   const rawProducts = window.localStorage.getItem('products')
//   if(!rawProducts) return 
//   const products = JSON.parse(rawProducts)
//   const itemsCounter = products.reduce((acc: number,curr: any)=>{
//     return acc + curr.count
//   },0)
//   return setCount(itemsCounter)
// },[cartProducts])

const cartContext = useAppInfo()

  return (
    <Link href='/cart' className="text-3xl mr-4 relative"  >
        <IoCartOutline className="dark:text-white"/>
        <span className="text-sm absolute -top-4 left-2 border rounded-full flex justify-center items-center bg-green-300 w-5 h-5">{cartContext?.productCountInCart}</span>
    </Link>
  )
}
