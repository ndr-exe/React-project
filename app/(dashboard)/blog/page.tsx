import { Suspense } from "react";
import Blogs from "../../components/Blogs/Blogs";
import BlogsLoader from '../../components/Blogs/BlogsLoader'
import { getDictionary } from "../../dictionaries"
import { cookies } from "next/headers";



export default async function page() {
  
  const lang = cookies().get('locale')?.value
  const dict = await getDictionary(lang as string)

    return (
    <Suspense fallback={<BlogsLoader/>}>
    <Blogs dict={dict}/>
    </Suspense>
    )
}
