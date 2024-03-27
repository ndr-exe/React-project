import { createBrowserRouter,RouterProvider,createRoutesFromElements,Route } from "react-router-dom";

//Component Imports 
import Main from "./components/Main";
import PageLayout from "./components/PageLayout";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import Blogs from "./components/Blogs";
import Profile from "./components/Profile";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageLayout/>}>
      <Route index element={<Blogs/>}/>
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
