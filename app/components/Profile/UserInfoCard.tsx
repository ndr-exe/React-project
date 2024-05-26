'use client'

import { Session, getSession } from "@auth0/nextjs-auth0";
import Image from "next/image"
import UploadAvatarModal from './UploadAvatarModal'
import { useState } from "react";
import { MdCameraAlt } from "react-icons/md";



export default function UserInfoCard({userData,initialAvatar}: {userData: any, initialAvatar: string}) {

    const [avatar, setAvatar] = useState<any>(()=>initialAvatar)
    const [activeModal, setActiveModal] = useState(false)

    function handleAvatarChange(src: string){
        setAvatar(src)
    }

    function handleModalClose(){
      setActiveModal(false)
    }
    const firtName = userData && userData.name.split(' ')[0]
   
  return (
    <section className='row-span-9 h-full grid place-content-center dark:text-white'>
        <div className={`mx-auto min-w-[500px] rounded-xl px-8 pt-9 pb-11 ${!activeModal && "border-s shadow-lg"} dark:border dark:border-gray-200/50 dark:shadow-none ${activeModal && 'dark:border-none'}`}>
        <ul className={`${activeModal && 'blur-xl'}`}>
            <li className="mb-5">
              <div className="mx-auto max-w-fit relative" >
            <Image src={avatar} alt="user" width={120} height={120} className="rounded-full shadow-lg shadow-orange-400 border border-gray-300 dark:border-orange-400 dark:shadow-md dark:shadow-orange-500/50" />
            <button className="w-[30px] h-[30px] rounded-full absolute bottom-1 right-1 grid place-content-center border border-gray-300 bg-orange-500 group" onClick={()=> setActiveModal(true)}><MdCameraAlt className="text-lg text-gray-300 group-hover:text-gray-100"/></button>
              </div>
            </li>
            <li className="text-center mb-1" > 
              <span className="font-bold text-2xl"> 
                   {userData.nickname}
              </span>
            </li>
            <li className="text-center text-sm mb-10"><span className="text-gray-800 dark:text-gray-300">{userData.email}</span></li>
            <div className="flex justify-between ">
            <li className="flex flex-col gap-2 text-center"><span className="text-sm text-gray-600/90 dark:text-gray-300">First Name</span> <span>{firtName}</span></li> 
            <li className="flex flex-col gap-2 text-center"><span className="text-sm text-gray-600/90 dark:text-gray-300">Last Name</span> <span>{userData.family_name}</span></li>
            </div>
        </ul>
        {
          activeModal && <UploadAvatarModal handleAvatarChange={handleAvatarChange} handleModalCLose={handleModalClose}/>
        }
        
      </div>
    </section>
  )
}
