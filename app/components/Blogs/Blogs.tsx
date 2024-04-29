import Blog from './Blog'

//Fetching BLOGS
async function fetchBlogs(){
  //check loading ui skeleton
  // await new Promise(resolve => setTimeout(resolve,3000))
  const blogsResponse = await fetch('https://dummyjson.com/posts')
  const blogsJson = await blogsResponse.json()

  // dummyjson /posts doesn't come with IMAGES nor UPLOAD-DATE so set them up manually-->
  const bigImg = 'https://dummyjson.com/image/900x225/6b879b/ffffff?text=BLOG!&fontSize=20'
  const smImg = 'https://dummyjson.com/image/436x150/414572/ffffff?text=Also+Blog!&fontSize=20'
  
  const blogsWithImagesAndDate = 
  blogsJson.posts
  .slice(0,20)
  .map((blog: RawBlogType , idx: number) => {
    return  {...blog, 
              image: idx%5===0 ? bigImg : smImg, 
              important: idx%5===0 ? true : false, 
              uploadDate: `${25-idx}/03/2024`
          }
  })
  return blogsWithImagesAndDate
}


export default async function Blogs({dict}: {dict: DictType}) {

const blogs = await fetchBlogs()

  return (
        <div className='row-span-9'>
            <ul className="h-full grid auto-rows-max grid-cols-12 overflow-scroll gap-x-7 gap-y-7 p-8">
                {blogs.map((blog: EditedBlogType) => {
                    const {title,body,important,image,id,uploadDate} = blog
                    return (
                        <Blog 
                        key= {id}
                        title = {title}
                        uploadDate = {uploadDate as string}
                        body = {body.slice(0,70)}
                        important = {important as boolean}
                        image = {image}
                        id={id}
                        dict={dict}
                        />
                    )
                })}

            </ul>
        </div>
  )


}



