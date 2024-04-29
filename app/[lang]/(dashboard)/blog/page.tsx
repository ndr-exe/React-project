import { Suspense } from "react";
import Blogs from "../../../components/Blogs/Blogs";
import BlogsLoader from '../../../components/Blogs/BlogsLoader'
import { getDictionary } from "../../dictionaries"



export default async function page({params:{lang}}: {params:{lang: string}}) {
  const dict = await getDictionary(lang)

    return (
    <Suspense fallback={<BlogsLoader/>}>
    <Blogs dict={dict}/>
    </Suspense>
    )
}
