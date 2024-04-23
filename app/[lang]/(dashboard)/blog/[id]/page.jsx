import BlogPage from "@/app/components/Blogs/BlogPage";

export async function generateStaticParams(){
    const res = await fetch('https://dummyjson.com/posts')
    const data = await res.json()
  
    return data.posts.map(post => ({
      id: post.id.toString()
    }))
  }

export default function page({params}) {
    return <BlogPage params={params}/>
}
