'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useRouter } from 'next/navigation';
import { useState, useRef, Dispatch, useOptimistic } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";




export default function AvatarUploadPage({handleAvatarChange,handleModalCLose}:{handleAvatarChange: (src:string)=>void, handleModalCLose: ()=>void}) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [isLoading,setIsLoading] = useState(false)
  const [isSelected,setIsSelected] = useState(false)


  const router = useRouter()
  return (
    <>
    <div className='absolute w-screen h-screen top-0 left-0 z-10 bg-gray-500/40' onClick={()=> handleModalCLose()}></div>
    <div className='absolute w-[550px] border h-[150px] bottom-[50%] left-[50%] -translate-x-[50%] translate-y-[50%] z-20 rounded-xl grid place-content-center gap-4 bg-gray-500/60 px-4 border-orange-500 dark:bg-gray-500'>
      <h1 className='text-center text-gray-700/80 font-bold text-xl mb-3 dark:text-gray-300'>Upload Your Avatar</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }
          setIsLoading(true)
          
          const file = inputFileRef.current.files[0];

          const response = await fetch(
            `/api/avatar/upload?filename=${file.name}`,
            {
              method: 'POST',
              body: file,
            },
          );

          const newBlob = (await response.json()) as PutBlobResult;


          handleAvatarChange(newBlob.url)
          router.refresh()
          setBlob(newBlob);
          setIsLoading(false)
          handleModalCLose()


        }}
      >
        <div className='flex'>
        <input name="file" ref={inputFileRef} type="file" 
        onInput={()=>setIsSelected(true)} 
        onChange={()=>{inputFileRef.current?.files && inputFileRef.current?.files?.length < 1 && setIsSelected(false)}} 
        required className='block text-sm text-slate-700 hover:file:text-white hover:file:bg-orange-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-500 file:hover:cursor-pointer' />
        <button disabled={(isLoading || !isSelected) && true } type="submit" className={`rounded-md py-2 px-3 min-w-[100px] inline-flex items-center disabled:opacity-50 ${isSelected ? 'bg-orange-600 text-white':'bg-white text-orange-600'} `}>
          {isLoading 
          ? <span className='w-full h-full grid place-content-center'><FaSpinner className='animate-spin text-white text-lg'/></span>
          :<><MdOutlineFileUpload className='text-lg font-bold'/><span>Upload Image</span></>}
          </button>
        </div>        
      </form>
    </div>
    </>
  );
}