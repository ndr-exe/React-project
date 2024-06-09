// ICON IMPORTS
import { FaTwitch } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export default function Footer({dict}: {dict: DictType}) {
  return (
    <footer className='row-start-11 row-span-2'>
        <ul className='flex justify-around h-[50%] items-center text-sm text-gray-500'>
            <li><a href="/">{dict.footer.about}</a></li>
            <li><a href="/">{dict.footer.partners}</a></li>
            <li><a href="/">{dict.footer.achievements}</a></li>
            <li><a href="/">{dict.footer.conditions}</a></li>
            <li><a href="/">{dict.footer.privacy}</a></li>
            <li><a href="/">{dict.footer.analytics}</a></li>
            <li><a href="/">{dict.footer.marketing}</a></li>
        </ul>
        <div className='flex justify-center gap-3 dark:text-gray-100'>
            <FaTwitch/>
            <FaGithub/>
            <FaTwitter/>
            <FaFacebook/>
            <FaInstagram/>
            <FaPinterest/>
        </div>
        <p className='flex justify-center pt-7 text-gray-600 italic text-xs'>
        {dict.footer.trade}
        </p>
    </footer>
  )
}
