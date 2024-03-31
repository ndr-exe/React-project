import profilePic from '../../assets/vice.jpeg'
import { useState } from 'react';

//ICON IMPORTS

import { IoMail } from "react-icons/io5";
import { GiWorld } from "react-icons/gi";
import { PiCalendarDuotone } from "react-icons/pi";



export default function Profile() {
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
    <div className='bg-zinc-900 grid grid-rows-1 grid-cols-12 row-span-9'>

    <div className='col-span-9 h-full border-r border-gray-700/50 flex justify-center items-center'>
            <div className="flex gap-[5rem] justify-center">
                <div className="flex flex-col justify-between basis-[25%] relative pt-[150px]">
                        <div className='rounded-full overflow-hidden w-[70%] flex justify-center absolute bottom-full right-[50%] translate-x-[50%] translate-y-1/2 border-4 border-blue-950' >
                        <img src={profilePic} alt="profile" className='w-full'  />
                        </div>
                        <h3 className='text-center text-2xl mb-5'>TheHarwoodButcher</h3>
                        <p className='text-center text-gray-500 mb-6'>Tommy Vercetti</p>
                        <div className='bg-zinc-950 p-4 flex-1 rounded-md '>
                            <h4 className='mb-2'>BIO</h4>
                            <hr className='mb-2' />
                            <p className='mb-2'>
                            This Persian tale, now done into Georgian, has hitherto been like a pearl of great price cast in play from hand to hand;
                            now I have found it and mounted it in a setting of verse; I have done a praiseworthy deed. 
                            The ravisher of my reason, proud and beautiful, willed me to do it.
                            </p>
                        </div>



                </div>
                <div className='flex flex-col bg-zinc-950 rounded-md border border-blue-950 px-12 py-6 justify-between'>
                <ul name="contact" className="flex flex-col justify-between gap-5 bg-zinc-950 text-base w-full"> 
                    <li>
                        <div className='flex items-center gap-2 text-gray-500'>
                            <span className='text-lg'><IoMail/></span>
                            <span className=''>Email:</span>
                        </div>
                        <span className='text-xl'>tommyvercetti@gta.com</span>
                    </li>
                    <li>
                        <div className='flex items-center gap-2 text-gray-500'>
                            <span className='text-lg'><GiWorld/></span>
                            <span className=''>Country:</span>
                        </div>
                        <span className='text-xl'>United States</span>
                    </li>
                    <li>
                        <div className='flex items-center gap-2 text-gray-500'>
                            <span className='text-lg'><PiCalendarDuotone/></span>
                            <span className=''>Date of Birth:</span>
                        </div>
                        <span className='text-lg'>20/04/1951</span>
                    </li>                  
                </ul>

                    <form  onSubmit={e => handleSubmit(e)} name='passCHange' id="passChange" className='flex flex-col'>
                    <label htmlFor="newPass" className='mb-2 text-base text-gray-500'>Type new password:</label>
                    <input onChange={(e)=> handleChange(e,'new')} value={newPass} autoComplete="off" id="newPass" name="newPass" type="password" required placeholder='New password...'className="py-2 px-2 mb-3 rounded-md bg-blue-950 placeholder:text-gray-500 outline-none placeholder:tracking-wide"/>

                    <label htmlFor="confPass"  className='mb-2 text-base text-gray-500'>Confirm password:</label>
                    <input onChange={(e)=> handleChange(e,'confirm')} value={confirmPass} autoComplete="off" name="confPass" id="confPass" type="password" required placeholder='Confirm Password...'className="py-2 px-2 mb-4 rounded-md bg-blue-950 placeholder:text-gray-500 outline-none placeholder:tracking-wide"/>

                    <button className="flex justify-center items-center text-xl text-white bg-orange-600 hover:bg-orange-700 hover:text-blue-950 py-1  rounded-md ">Save Changes</button>
                    </form>
                </div>

         </div>
        </div>

    <div className='col-span-3 h-full px-7 flex flex-col items-start justify-end pb-28 '>
        <h2 className='text-4xl font-mono font-bold uppercase tracking-wider mb-4'>Profile Page</h2>
        <p className='text-gray-400 font-serif'>
        The lover must be constant, not lewd, impure an faithless; when he is far from his beloved he must heave sigh upon sigh;
         his heart must be fixed on one from whom he endures wrath or sorrow if need be. I hate heartless love--embracing, kissing, 
         noisy bussing.
        </p>
    </div>
</div>
  )
}
