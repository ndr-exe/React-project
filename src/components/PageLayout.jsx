import { Outlet } from "react-router-dom";

// Component imports
import Header from "./Header/Header";
import Footer from "./Footer/Footer";



export default function PageLayout() {
  return (
    <div className='grid grid-cols-1 grid-rows-12 h-lvh text-white'>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
