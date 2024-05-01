import BlogPage from "../../../components/Blogs/BlogPage"


export async function generateStaticParams(){
    const res = await fetch('https://dummyjson.com/posts')
    const data = await res.json()
  
    return data.posts.map((post: EditedBlogType) => ({
      id: post.id.toString()
    }))
  }

export default function page({params}: {params:{id: number}}) {
    return <BlogPage params={params}/>
}
