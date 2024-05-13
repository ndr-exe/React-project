'use client'

import { useEffect, useReducer, useState } from "react"
import {ProductPayload,InitialProducts,reducer,REDUCER_ACTION_TYPE} from '../../../reducer'
import Image from 'next/image'
import Link from "next/link"
import { useLocalStorage } from "../../../hooks"




export default function Checkout() {

    function checkLocalStorage(){
        if(typeof window === 'undefined') return []
        if(!window.localStorage.getItem('products')) return []
        const products = JSON.parse(window.localStorage.getItem('products')as string)
        return products
    }
    const initialState: InitialProducts[] = checkLocalStorage()

    const [selectedProducts,dispatch] = useReducer(reducer,initialState)
    

    const [updateItems] = useLocalStorage()

    useEffect(()=>{
        updateItems(selectedProducts)
    }
    ,[selectedProducts])

    function handleIncrement(obj: ProductPayload){
        dispatch({
            type: REDUCER_ACTION_TYPE.INCREMENT,
            payload: obj })
      }
    function handleDecrement(obj: ProductPayload){
        dispatch({
            type: REDUCER_ACTION_TYPE.DECREMENT,
            payload: obj })
      }
    function handleClear(){
        dispatch({
            type: REDUCER_ACTION_TYPE.RESET,
            payload: {} as ProductPayload
        })
      }

    // useEffect(()=>{
    //     const rawProducts = window.localStorage.getItem('products')
    //     if(!rawProducts) return
    //     const products = JSON.parse(rawProducts)
    //     setProducts(products)
    // },[])
  return (
    <div className="w-full h-lvh overflow-hidden ">
       <div className="text-center mt-3">
         <Link href='/marketplace' className="hover:text-orange-500">Go to Marketplace</Link>
        </div>
      <div className="max-w-screen-sm mx-auto mt-9 max-h-[80%] min-h-[500px] bg-gray-300/60 rounded-3xl overflow-scroll">
        <ul className="flex flex-col gap-4 py-6 px-7">
            {selectedProducts.map((product)=> {
                // const {brand,title,thumbnail,price,id} = product
                return (
                <li key={product.id} className="flex px-7 py-5 justify-between border border-black rounded-md ">
                    <Image src={product.thumbnail} alt='product' width={150} height={150}/>
                    <div>
                    <p className="">{product.title}</p>
                    <p className="text-gray-700 text-sm">{product.brand}</p>
                    </div>
                    <p className="text-xl">{product.price}$</p>
                    <p className="flex flex-col items-center">
                        <span>quantity</span>
                        <span>{product.count}</span>
                    </p>
                    <div className="text-3xl flex flex-col">
                        <button onClick={()=>handleIncrement(product)}>+</button>
                        <button onClick={()=>handleDecrement(product)}>-</button>
                    </div>
                </li>)
            })}
        </ul>
     </div>
        <button onClick={()=> handleClear()} className="absolute right-12 text-2xl text-red-500">Clear Cart</button>
    </div>
  )
}
