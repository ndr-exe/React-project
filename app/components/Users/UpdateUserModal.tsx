'use client'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { UpdateUser, User } from "../../../api";
import { useOptimistic, useRef, useState } from 'react';
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";


type Message = {
    message: string
  }

const messages = [{message:''}]

export default function UpdateUserModal({closeModal,user}: {closeModal: any, user: User}) {
    const [formFields,setFormFields] = useState(()=>{
        const {name,email,age} = user
        return {name,email,age}
    })

    const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    Message[],
    string
>(messages, (state, newMessage) => [...state, { message: newMessage }])

  const formRef = useRef<HTMLFormElement | null>(null);
//   const btnRef = useRef<HTMLButtonElement | null>(null)
  const router = useRouter()


  return (
    <div>
        <div className="absolute w-full h-full top-0 right-0 bg-gray-500/70" onClick={closeModal}></div>

        <form action={async (formData: FormData) => {
          const message = 'Updating user info...'
          if(user.age === formFields.age && user.email === formFields.email && user.name === formFields.name){
            console.log('please provide updated user info')
          }else {
                addOptimisticMessage(message)
                formData.append('id',`${user.id}`)
                await UpdateUser(formData)
                // formRef.current?.reset()
                router.refresh()
                closeModal()
            }

        }}
          className="w-[500px] h-[400px] bg-teal-800 absolute bottom-[50%] translate-y-[50%] right-[50%] translate-x-[50%] flex flex-col gap-5 items-center pt-[80px] rounded-2xl"
          ref={formRef}>
            <button className="absolute top-4 right-4" onClick={closeModal}>
                <IoIosCloseCircleOutline className="text-4xl text-white hover:text-red-500" />
            </button>
            <input value={formFields.name}  onChange={(e)=>setFormFields((prev)=> ({...prev, name: e.target.value }))} required type="text" name="name" id="" placeholder="Name"  className="w-[80%] py-3 rounded-xl px-3 placeholder:text-gray-700" />
            <input value={formFields.email} onChange={(e)=>setFormFields((prev)=> ({...prev, email: e.target.value }))}  required type="text" name="email" id="" placeholder="Email" className="w-[80%] py-3 rounded-xl px-3 placeholder:text-gray-700" />
            <input value={formFields.age} onChange={(e)=>setFormFields((prev)=> ({...prev, age: Number(e.target.value) }))}  required type="text" name="age" id="" placeholder="Age" className="w-[80%] py-3 rounded-xl px-3 placeholder:text-gray-700" />
             <button className="w-max mx-auto flex items-center gap-1 py-2 px-3 mt-4 bg-gray-400/30 rounded-md hover:bg-teal-500/50 hover:text-white"><CiEdit className="text-xl"/>Save info</button>
             <div className="mb-3">
             {optimisticMessages.map((m, k) => (
            <div className="text-white" key={k}>{m.message}</div>))}
             </div>
        </form>
    </div>
  )
}
