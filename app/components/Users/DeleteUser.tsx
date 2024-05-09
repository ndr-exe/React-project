'use client'

import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { BASE_URL } from "../../../api";


export default function DeleteUser({id}: {id:number}) {
    const router = useRouter()

    async function handleClick() {
        router.refresh()
        return await fetch(`${BASE_URL}/api/delete-user`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userToDelete: id} ),
        })
      }

  return (
    <button onClick={handleClick} className="text-xl"><RiDeleteBin5Line /></button>
  )
}
