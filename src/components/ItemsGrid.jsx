import Search from "./Search";
import Item from "./Item";

import games from "../components/database"


export default function ItemsGrid() {
  return (
    <div className='col-span-9 bg-zinc-900  h-full border-r border-gray-700/50 grid grid-rows-12 grid-cols-1'>

        <Search/>

        <div className='row-span-10 grid grid-cols-3 grid-rows-2'>
            {games.map(game => {
                const {image,title,genre,release,platform,price} = game
                return (
                    <Item 
                    image={image}
                    title={title}
                    genre={genre}
                    release={release}
                    platform={platform}
                    price={price}
                    key={title}
                    />
                )
            })}              
        </div>
        </div>
  )
}
