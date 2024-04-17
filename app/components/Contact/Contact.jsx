// Icon imports
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { IoMail } from "react-icons/io5";


export default function Contact() {
  return (
    <div className='row-span-9'>
           <div className='col-span-9 h-full flex justify-center items-center'>
            <div className="flex gap-[5rem]">
                <form name="contact" className="flex flex-col justify-between gap-5"> 
                    <input autoComplete="off" name="name" type="text" required placeholder='NAME' className="py-2 px-2 rounded-md bg-gray-300/60 placeholder:text-gray-900 outline-none placeholder:tracking-wide"/>
                    <input autoComplete="off" name="email" type="email" required placeholder='EMAIL'className="py-2 px-2 rounded-md bg-gray-300/60 placeholder:text-gray-900 outline-none placeholder:tracking-wide"/>
                    <textarea name="message" required id="message" cols="42" rows="7" placeholder='MESSAGE' className="py-2 px-2 rounded-md bg-gray-300/60 resize-none placeholder:text-gray-900 outline-none placeholder:tracking-wide"></textarea>
                    <button className="flex justify-center items-center text-xl text-orange-600 bg-transparent  hover:bg-orange-500 hover:text-white border border-orange-600 py-2 rounded-md "><BsSend/></button>
                </form>
                <div className="flex flex-col justify-between py-5 ">
                    <ul className="text-gray-600 text-lg flex flex-col gap-5"> 
                        <li className="flex items-center gap-6">
                            <span className="text-4xl text-gray-800 "><MdLocationPin/></span>
                            <span className="tracking-wide">221B Baker Street</span>
                        </li>

                        <li className="flex items-center gap-6">
                            <span className="text-4xl text-gray-800"><MdPhone/></span>
                            <span className="tracking-wide">(911) 420-1337</span>
                        </li>
                        <li className="flex items-center gap-6">
                            <span className="text-4xl text-gray-800"><IoMail/></span>
                            <span className="tracking-wide">fastlag@gmail.com</span> 
                        </li>
                    </ul>
                    <ul className="flex justify-around text-xl text-black border-y border-gray-400 py-5">
                        <li className="p-3 bg-gray-400/70 rounded-full"><a href="/"><FaTwitter/></a></li>
                        <li className="p-3 bg-gray-400/70 rounded-full"><a href="/"><FaFacebook/></a></li>
                        <li className="p-3 bg-gray-400/70 rounded-full"><a href="/"><FaTwitch/></a></li>
                        <li className="p-3 bg-gray-400/70 rounded-full"><a href="/"><FaGithub/></a></li>

                    </ul>
                    <p className="text-center italic text-gray-800">Don&apos;t Be Shy Hit Us Up!</p>
                </div>
         </div>
        </div>
    </div>
  )
}
