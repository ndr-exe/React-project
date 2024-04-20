import { Suspense } from "react";
import Blogs from "../../../components/Blogs/Blogs";
import BlogsLoader from '../../../components/Blogs/BlogsLoader'

export default function page() {
    return (
    <Suspense fallback={<BlogsLoader/>}>
    <Blogs/>
    </Suspense>
    )
}
