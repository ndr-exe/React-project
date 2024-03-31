import { createBrowserRouter,RouterProvider,createRoutesFromElements,Route } from "react-router-dom";

//Component Imports 
import PageLayout from "./components/PageLayout";
import Main from "./components/Marketplace/Main";
import Contact from "./components/Contact/Contact";
import NotFound from "./components/NotFound/NotFound";
import Blogs from "./components/Blogs/Blogs";
import Profile from "./components/Profile/Profile";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageLayout/>}>
      <Route index element={<Main/>}/>
      <Route path="marketplace" element={<Main/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="blog" element={<Blogs/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Route>
  )
)

function App() {

    return (
      <RouterProvider router={router}/>
    )
}

export default App;
