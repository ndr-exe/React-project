'use client'
import { useState,useEffect } from "react";

//COMPONENT IMPORTS
import Search from "./Search";
import Item from "./Item";


export default function ItemsGrid() {
    const [products,setProducts] = useState([])
    const [initialProducts,setInitialProducts] = useState([])
    const [activeFilter,setActiveFilter] = useState(null)
    const [isSorted,setIsSorted] = useState(false)

    // fetch PRODUCTS
    useEffect(()=>{
        async function getProducts(){
            const res = await fetch("https://dummyjson.com/products/")
            const json = await res.json()
            setProducts(json.products.slice(0,21))
            setInitialProducts(json.products.slice(0,21))
        }
        getProducts()
    },[])



    // Applying FILTERS
    function handleFilter(filter = null,remove = false){
        if(!filter){
            setActiveFilter(null)
            setProducts(initialProducts)
            return
        } 

        if(remove && activeFilter){
            setActiveFilter(null)
            setProducts(initialProducts)
            return
        }
        
        setActiveFilter(filter)
        const filteredProducts =  initialProducts.filter(product => {
            return product.category === filter
        })
        setProducts(filteredProducts)

    }



    //Searching through *ALL* items
    function handleSearch(query) {
            handleSort('default')   
            handleFilter()
            if (query === 'empty') return setProducts(initialProducts)
            const searchedProducts = initialProducts.filter(product => {
                return (product.title
                        .split(" ")
                        .join("")
                        .toLowerCase()
                        .includes(query)
                        )
            })
            setProducts(searchedProducts)
            
    }



    //Applying sort 
    function handleSort(param){
        let sortedProducts
        switch(param){
            case "price-ASC":
            sortedProducts = [...products].sort((a,b)=> a.price - b.price)
            setIsSorted("price-ASC")
            break;

            case "price-DESC":
            sortedProducts = [...products].sort((a,b)=> b.price - a.price)
            setIsSorted("price-DESC")
            break;

            default:
             sortedProducts = [...products].sort((a,b)=> a.id - b.id)
             setIsSorted(false)
             

        }
       setProducts(sortedProducts)
    }


  return (
    <div className='col-span-9 h-full grid grid-cols-1 grid-rows-[110px,1fr]'>

        <Search 
        activeFilter={activeFilter}
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        handleSort={handleSort}
        isSorted={isSorted}
        />
    {products.length || initialProducts.length ? (
        <div className='grid grid-cols-[repeat(4,250px)] auto-rows-[320px] overflow-y-scroll gap-12 justify-center'>
            {products.map(product => {
                const {id,title,description,price,brand,category,thumbnail} = product
                return (
                    <Item 
                    thumbnail={thumbnail}
                    title={title.length < 28 ? title : title.slice(0,28).concat("...")}
                    brand={brand}
                    category={category}
                    price={price}
                    description={description.slice(0,20).concat("...")}
                    key={id}
                    id={id}
                    />
                )
            })}              
        </div>
        ): <div className="w-full h-full grid place-content-center">Loading ...</div>}
        </div>
  )
}