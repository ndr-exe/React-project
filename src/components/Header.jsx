import { FaBuildingColumns } from "react-icons/fa6";
import { VscGraph } from "react-icons/vsc";
import { BiSupport } from "react-icons/bi";
import { FaWrench } from "react-icons/fa";

import headerImg from "../assets/first.png"


export default function Header(){

    return (
        <header className='w-full h-screen bg-sky-700	 flex flex-col justify-between'>
        <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
            <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
                <p className='text-2xl text-white'>May The Force Be With You	</p>
                <h1 className='py-3 text-5xl md:text-7xl font-bold'>Power Generation Made Easy</h1>
                <p className='text-2xl text-white'>We Think Therefore We Are.</p>
                <button className='py-3 px-6 sm:w-[60%] my-4'>Get Started</button>
            </div>
            <div>
                <img className='w-full' src={headerImg} alt="/" />
            </div>
            <div className='absolute flex flex-col py-8 md:min-w-[760px] bottom-[5%]
            mx-1 md:left-1/2 transform md:-translate-x-1/2 bg-sky-100
            border border-slate-300 rounded-xl text-center shadow-xl'>
                <p>We Are Offering</p>
                <div className='flex justify-between flex-wrap px-4'>
                    <p className='flex items-center px-4 py-2 text-slate-500'><FaBuildingColumns className='h-6 text-indigo-600 mr-1'  /> Reliability</p>
                    <p className='flex items-center px-4 py-2 text-slate-500'><VscGraph className='h-6  text-indigo-600 mr-1 ' /> Consistency</p>
                    <p className='flex items-center px-4 py-2 text-slate-500'><BiSupport className='h-6 text-indigo-600 mr-1' /> Support</p>
                    <p className='flex items-center px-4 py-2 text-slate-500'><FaWrench className='h-6 text-indigo-600 mr-1' /> Maintenance</p>
                </div>
            </div>
        </div>
    </header>
    )
}