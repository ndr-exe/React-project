'use client'

import { useState } from "react";

//ICON IMPORTS
import { TiUserAddOutline } from "react-icons/ti";
import AddUserModal from "./AddUserModal";

export default function AddUser() {
    const [isActiveModal, setIsActiveModal] = useState(false)

    function handleClick(){
      setIsActiveModal(true)
    }
    function closeModal(){
     return setIsActiveModal(false)
    }
  return (
    <div>
    <button onClick={handleClick} className="w-max mx-auto flex items-center gap-1 py-2 px-3 mt-4 bg-gray-400/50 rounded-md hover:bg-gray-400 hover:text-indigo-600"><TiUserAddOutline className="text-xl"/>add User</button>
    {isActiveModal ? <AddUserModal closeModal={closeModal}/> : null }
    </div>
  )
}
