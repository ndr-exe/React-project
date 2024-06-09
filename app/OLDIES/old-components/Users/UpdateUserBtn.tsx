'use client'
//ICON IMPORTS 
import { GrEdit } from "react-icons/gr";

import UpdateUserModal from './UpdateUserModal'

import { useState } from "react";
import { User } from "../../../api";


export default function UpdateUserBtn({user}:{user: User}) {
  const [isActiveModal, setIsActiveModal] = useState(false)

  function handleClick(){
    setIsActiveModal(true)
  }
  function closeModal(){
   return setIsActiveModal(false)
  }
  return (
    <div>
    <button onClick={handleClick} ><GrEdit/></button>
    {isActiveModal ? <UpdateUserModal closeModal={closeModal} user={user}/> : null }
    </div>

  )
}