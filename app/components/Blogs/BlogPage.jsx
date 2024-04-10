'use client'

import { useEffect, useState } from "react"
import Image from "next/image"


export default function BlogPage({params}) {
  const [blog,setBlog] = useState(null)

  useEffect(()=>{
    async function fetchBlog(){
        const blogResponse = await fetch(`https://dummyjson.com/posts/${params.id}`)
        const blogJson = await blogResponse.json()

        // dummyjson /posts doesn't come with IMAGES nor UPLOAD-DATE so set them up manually-->
        const bigImg = 'https://dummyjson.com/image/1280x300/3d5368/ffffff?text=BLOG!&fontSize=20'
        
        const blogWithImagesAndDate = 
        {...blogJson, 
        image: bigImg,
        uploadDate: `${26-params.id}/03/2024`}


        setBlog(blogWithImagesAndDate)
  
    }
    fetchBlog()
  },[])

  return (
    blog ? 
    (<div className="w-full h-full">
        <div className="relative">
            <Image src={blog.image} alt="hey" width={1280} height={300} />
            {/* <p>{blog.tags[0]}</p> */}
            <div className="absolute right-0 bottom-0 flex gap-2 mr-4 mb-1">
                {blog.tags.map((tag,idx) => {
                    let bgColor = 'bg-lime-700'
                    if(idx === 1) bgColor = 'bg-indigo-800'
                    if(idx === 2) bgColor = 'bg-green-700'
                    return <span key={idx} className={`px-2 py-1 rounded-md text-blue-100 ${bgColor}`}>{tag}</span>
                })}
            </div>
        </div>
        <div className="pl-7 pr-12 pt-10 "> 
        <h1 className="text-white text-3xl mb-7">{blog.title}</h1>
        <p className="text-lg">
            {blog.body}
        </p>
         <p className="mt-12 text-right italic text-gray-300">{blog.uploadDate}</p>
        </div>
    </div>)
    : <div className="w-full h-full grid place-content-center">Loading ...</div>
  )
}

