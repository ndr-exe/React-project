'use client'

import Image from "next/image"
import { useState } from "react"
import { useAppInfo } from "../Context-Provaiders/AppProvider"
import { updateCart } from "../funcs"

import { MdDeleteOutline } from "react-icons/md";


export default function CartList({selectedProducts,cartProducts}: {selectedProducts: CartProductType[], cartProducts: CartProducts}) {
    const [cartState,setCartState] = useState<CartProducts>(()=> {
        if(cartProducts.empty) return {0:0}
        return cartProducts
    })
    const [selectedProductsState, setSelectedProductsState] = useState(()=>selectedProducts)

    const cartContext = useAppInfo()

    function handleIncrement(id:number){

        cartContext?.setProductsCountInCart((prev) => prev + 1)

            const updatedCartState = {...cartState, [id]: cartState[id] + 1}
            setCartState(updatedCartState)
            updateCart(updatedCartState)
            return
      }

    function handleDecrement(id:number){

        cartContext?.setProductsCountInCart((prev) => prev - 1)
        if(cartState[id] === 1) {
            const updatedCartState = {...cartState}
            const updatedProductsState = selectedProductsState.filter((product:CartProductType)=>product.id !== id)
            delete updatedCartState[id]
            setSelectedProductsState(updatedProductsState)
            setCartState(updatedCartState)
            updateCart(updatedCartState)
            return
        }
            const updatedCartState = {...cartState, [id]: cartState[id] - 1}
            setCartState(updatedCartState)
            updateCart(updatedCartState)
            return
      }

    function handleDelete(id:number){
            cartContext?.setProductsCountInCart((prev) => prev - cartState[id])
            const updatedCartState = {...cartState}
            const updatedProductsState = selectedProductsState.filter((product:CartProductType)=>product.id !== id)
            delete updatedCartState[id]
            setSelectedProductsState(updatedProductsState)
            setCartState(updatedCartState)
            updateCart(updatedCartState)
            return

    }
    function handleReset(){
            cartContext?.setProductsCountInCart(0)
            setSelectedProductsState([])
            setCartState({})
            updateCart({})
            return

    }

    return (
        <div className="w-full h-full dark:text-white">
            <div className="h-full w-full p-5">
            <ul className="w-[780px] h-[80%] mx-auto overflow-scroll border rounded-lg">
               {selectedProductsState.length !==0 ? (selectedProductsState.map((product:CartProductType)=>{
                return (
                    <li key={product.id} className="flex justify-around items-center border-b-2 py-2">
                        <div>
                        <Image src={product.thumbnail} alt={product.title} width={135} height={135}/>
                        </div>
                        <div>
                            <p>{product.title}</p>
                            <p className="text-sm text-gray-500">{product.brand}</p>
                        </div>
                        <div>
                            <p>${product.price * cartState[product.id]}</p>
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                            <button className="text-xl text-green-500" onClick={()=> handleIncrement(product.id)}>+</button>
                            <p className="font-bold">{cartState[product.id]}</p>
                            <button className="text-xl text-red-500" onClick={()=> handleDecrement(product.id)}>-</button>
                        </div>
                        <button onClick={()=>handleDelete(product.id)}><MdDeleteOutline className="text-xl text-red-800"/></button>


                    </li>
                )
               })): <div className="w-[120px] mx-auto mt-9 text-gray-500">Cart is Empty</div>} 
            </ul>
            <button className="block mx-auto mt-10 text-red-700" onClick={()=>handleReset()}>CLEAR CART</button>
            </div>


        </div>
    )
}
