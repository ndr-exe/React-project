import {default as initialgames} from "../database"
import { useState } from "react";

//COMPONENT IMPORTS
import Search from "./Search";
import Item from "./Item";

export default function ItemsGrid() {
    const [games,setGames] = useState(initialgames)
    const [filters,setFilters] = useState([])
    const [isSorted,setIsSorted] = useState(false)



    //Apply multiple filters on items at the same time
    function handleFilter(e,selectedFilter, remove = false,callBackFn,condition){
        let activeFilters
        //Adding selected Filter & updating state
        handleSort('default')
        if(!remove){
            activeFilters = [...filters,selectedFilter]
            setFilters(activeFilters)
        }
        //Removing selected Filter & updating state
        else    
         {
            activeFilters = [...filters].filter(f => f !== selectedFilter)
            setFilters(activeFilters)
        }

        //check if displayed games are satisfying all of the selected Genres/Categories        
        setGames(initialgames.filter(game => {
            let init=true

            activeFilters.forEach(filter => {
                if(game.genre.indexOf(filter) === -1) return init=false
            })
            
            return init ?  game : false
        }))
    }

    //Searching through *ALL* items
    function handleSearch(query) {
            handleSort('default')   
            setFilters([])
            if (query === 'empty') return setGames(initialgames)
            const searchedGames = initialgames.filter(game => {
                return (game.title
                        .split(" ")
                        .join("")
                        .toLowerCase()
                        .includes(query)
                        )
            })
            setGames(searchedGames)

    }

    //Applying sort 
    function handleSort(param){
        let sortedGames
        switch(param){
            case "price-ASC":
            sortedGames = [...games].sort((a,b)=> a.price - b.price)
            setIsSorted("price-ASC")
            break;

            case "price-DESC":
            sortedGames = [...games].sort((a,b)=> b.price - a.price)
            setIsSorted("price-DESC")
            break;

            case "year-ASC":
             sortedGames = [...games].sort((a,b)=> a.release - b.release)
            setIsSorted("year-ASC")
            break;

            case "year-DESC":
             sortedGames = [...games].sort((a,b)=> b.release - a.release)
            setIsSorted("year-DESC")
            break;

            default:
             sortedGames = [...games].sort((a,b)=> a.id - b.id)
             setIsSorted(false)
             

        }
       setGames(sortedGames)
    }


  return (
    <div className='col-span-9 bg-zinc-900 h-full border-r border-gray-700/50 grid overflow-y-scroll grid-cols-1 grid-rows-[12%,1fr]'>

        <Search 
        filters={filters}
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        handleSort={handleSort}
        isSorted={isSorted}
        />

        <div className='grid grid-cols-3 grid-rows-2 '>
            {games.map(game => {
                const {image,title,genre,release,platform,price,id} = game
                return (
                    <Item 
                    image={image}
                    title={title}
                    genre={genre.join(" ")}
                    release={release}
                    platform={platform}
                    price={price}
                    key={id}
                    />
                )
            })}              
        </div>
        </div>
  )
}


