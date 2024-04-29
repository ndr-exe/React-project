import BlogPage from "../../../../components/Blogs/BlogPage"


export async function generateStaticParams(){
    const res = await fetch('https://dummyjson.com/posts')
    const data = await res.json()
  
    return data.posts.map((post: EditedBlogType) => ({
      id: post.id.toString(),
      lang: 'en'
    }))
  }

export default function page({params}: {params:{lang: string, id: number}}) {
    return <BlogPage params={params}/>
}
