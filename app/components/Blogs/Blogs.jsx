import Blog from './Blog'
import {blogs} from "../../database"

export default function Blogs() {
  return (
        <div className='bg-zinc-900 grid grid-rows-1 grid-cols-12 row-span-9'>
            <ul className="col-span-9 bg-zinc-900  h-full border-r border-gray-700/50 grid grid-cols-12 auto-rows-[50%] overflow-scroll gap-x-7 gap-y-7 p-8">
                {blogs.map(blog => {
                    const {title,uploadDate,description,important,image,id} = blog
                    return (
                        <Blog 
                        key= {id}
                        title = {title}
                        uploadDate = {uploadDate}
                        description = {description}
                        important = {important}
                        image = {image}
                        />
                    )
                })}

            </ul>
            
            <div className='col-span-3 h-full px-7 flex flex-col items-start justify-end pb-28 '>
                <h2 className='text-4xl font-mono font-bold uppercase tracking-wider mb-4'>Blogs</h2>
                <p className='text-gray-400 font-serif'>
                By shedding tears of blood we praise King Thamara, whose praises I, not ill-chosen, 
                have told forth. For ink I have used a lake of jet, and for pen a pliant crystal. 
                Whoever hears, a jagged spear will pierce his heart!
                </p>
                
    
            </div>
        </div>
      )
}
