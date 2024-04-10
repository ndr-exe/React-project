'use client'

import Blog from './Blog'
import { useState,useEffect } from 'react'


export default function Blogs() {
    const [blogs,setBlogs] = useState([])

  //Fetching BLOGS

  useEffect(()=>{
    async function fetchBlogs(){
        const blogsResponse = await fetch('https://dummyjson.com/posts')
        const blogsJson = await blogsResponse.json()

        // dummyjson /posts doesn't come with IMAGES nor UPLOAD-DATE so set them up manually-->
        const bigImg = 'https://dummyjson.com/image/900x225/6b879b/ffffff?text=BLOG!&fontSize=20'
        const smImg = 'https://dummyjson.com/image/436x150/414572/ffffff?text=Also+Blog!&fontSize=20'
        
        const blogsWithImagesAndDate = 
        blogsJson.posts
        .slice(0,20)
        .map((blog,idx) => {
          return  {...blog, 
                    image: idx%5===0 ? bigImg : smImg, 
                    important: idx%5===0 ? true : false, 
                    uploadDate: `${25-idx}/03/2024`
                }
        })
        setBlogs(blogsWithImagesAndDate)
    }

    fetchBlogs()


  },[])



  return (
    blogs.length ? (
        <div className='bg-zinc-900 grid grid-rows-1 grid-cols-12 row-span-9'>
            <ul className="col-span-9 bg-zinc-900  h-full border-r border-gray-700/50 grid grid-cols-12 auto-rows-[50%] overflow-scroll gap-x-7 gap-y-7 p-8">
                {blogs.map(blog => {
                    const {title,body,important,image,id,uploadDate} = blog
                    return (
                        <Blog 
                        key= {id}
                        title = {title}
                        uploadDate = {uploadDate}
                        body = {body.slice(0,70)}
                        important = {important}
                        image = {image}
                        id={id}
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
    ) : <div className='bg-zinc-900 grid row-span-9 place-content-center'>Loading...</div>
  )


}



