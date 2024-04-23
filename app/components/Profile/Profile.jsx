'use client'

import profilePic from '../../assets/Profile/vice.jpeg'
import Image from "next/image"
import { useState } from 'react';

//ICON IMPORTS

import { IoMail } from "react-icons/io5";
import { GiWorld } from "react-icons/gi";
import { PiCalendarDuotone } from "react-icons/pi";



export default function Profile({dict}) {
    const [newPass,setNewPass] = useState('')
    const [confirmPass,setConfirmPass] = useState('')

    function handleSubmit(e){
        e.preventDefault()
        if (newPass === confirmPass){
            console.log('yep')
        } else {
            console.log("passwords nope")
        }

    }

    function handleChange (e,passType) {
        passType === "new" ? setNewPass(e.target.value) : setConfirmPass(e.target.value)
        console.log(newPass,confirmPass)
    }

  return (
    <div className='row-span-9'>

    <div className='col-span-9 h-full flex justify-center items-center'>
            <div className="flex gap-[5rem] justify-center">
                <div className="flex flex-col justify-between basis-[25%] relative pt-[150px]">
                        <div className='rounded-full overflow-hidden w-[70%] flex justify-center absolute bottom-full right-[50%] translate-x-[50%] translate-y-1/2 border-4 border-gray-300' >
                        <Image src={profilePic} alt="profile" className='w-full h-auto'  />
                        </div>
                        <h3 className='text-center text-2xl mb-5 dark:text-gray-100'>TheHarwoodButcher</h3>
                        <p className='text-center text-gray-950 mb-6 dark:text-gray-200'>Tommy Vercetti</p>
                        <div className='p-4 flex-1 rounded-md shadow-lg '>
                            <h4 className='mb-2 text-gray-700'>{dict.profile.bio}</h4>
                            <hr className='mb-2' />
                            <p className='mb-2 text-black dark:text-gray-200'>
                            This Persian tale, now done into Georgian, has hitherto been like a pearl of great price cast in play from hand to hand;
                            now I have found it and mounted it in a setting of verse; I have done a praiseworthy deed. 
                            The ravisher of my reason, proud and beautiful, willed me to do it.
                            </p>
                        </div>



                </div>
                <div className='flex flex-col rounded-md border border-gray-300 px-12 py-6 justify-between shadow-sm'>
                <ul name="contact" className="flex flex-col justify-between gap-5 text-base w-full"> 
                    <li>
                        <div className='flex items-center gap-2 text-gray-700'>
                            <span className='text-lg dark:text-gray-400'><IoMail/></span>
                            <span className='dark:text-gray-400'>{dict.profile.email}:</span>
                        </div>
                        <span className='text-xl dark:text-gray-200'>tommyvercetti@gta.com</span>
                    </li>
                    <li>
                        <div className='flex items-center gap-2 text-gray-700'>
                            <span className='text-lg dark:text-gray-400'><GiWorld/></span>
                            <span className='dark:text-gray-400'>{dict.profile.country}:</span>
                        </div>
                        <span className='text-xl dark:text-gray-200'>United States</span>
                    </li>
                    <li>
                        <div className='flex items-center gap-2 text-gray-700'>
                            <span className='text-lg dark:text-gray-400'><PiCalendarDuotone/></span>
                            <span className='dark:text-gray-400'>{dict.profile.dateOfBirth}:</span>
                        </div>
                        <span className='text-lg dark:text-gray-200'>20/04/1951</span>
                    </li>                  
                </ul>

                    <form  onSubmit={e => handleSubmit(e)} name='passCHange' id="passChange" className='flex flex-col'>
                    <label htmlFor="newPass" className='mb-2 text-base text-gray-800 dark:text-gray-300'>{dict.profile.typeNewPass}:</label>
                    <input onChange={(e)=> handleChange(e,'new')} value={newPass} autoComplete="off" id="newPass" name="newPass" type="password" required placeholder={`${dict.profile.newPassHolder}...`} className="py-2 px-2 mb-3 rounded-md bg-gray-300 placeholder:text-gray-800 outline-none placeholder:tracking-wide"/>

                    <label htmlFor="confPass"  className='mb-2 text-base text-gray-800 dark:text-gray-300'>{dict.profile.confirmPass}:</label>
                    <input onChange={(e)=> handleChange(e,'confirm')} value={confirmPass} autoComplete="off" name="confPass" id="confPass" type="password" required placeholder={`${dict.profile.confirmPassHolder}...`} className="py-2 px-2 mb-4 rounded-md bg-gray-300 placeholder:text-gray-800 outline-none placeholder:tracking-wide"/>

                    <button className="flex justify-center items-center text-xl text-orange-600 hover:text-white  hover:bg-orange-600 border border-orange-600 py-1  rounded-md ">{dict.profile.save}</button>
                    </form>
                </div>

         </div>
        </div>
</div>
  )
}
