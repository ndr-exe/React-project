// ICON IMPORTS
import { FaTwitch } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className='row-start-11 row-span-2'>
        <ul className='flex justify-around h-[50%] items-center text-sm text-gray-500'>
            <li><a href="/">About</a></li>
            <li><a href="/">Partners</a></li>
            <li><a href="/">Achievements</a></li>
            <li><a href="/">Conditions</a></li>
            <li><a href="/">Privacy</a></li>
            <li><a href="/">Analytics</a></li>
            <li><a href="/">Marketing</a></li>
        </ul>
        <div className='flex justify-center gap-3'>
            <FaTwitch/>
            <FaGithub/>
            <FaTwitter/>
            <FaFacebook/>
            <FaInstagram/>
            <FaPinterest/>
        </div>
        <p className='flex justify-center pt-7 text-gray-600 italic text-xs'>
        2024 Solaris Group. All rights reserved
        </p>
    </footer>
  )
}
