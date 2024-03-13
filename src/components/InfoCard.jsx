import {PhoneIcon} from "@heroicons/react/24/solid"

export default function InfoCard({header,details,number}){
    return (

                <div className='bg-white rounded-xl shadow-2xl'>
                    <div className='p-8'>
                        <PhoneIcon className='w-16 p-4 bg-orange-600 text-white rounded-lg mt-[-4rem]' />
                        <h3 className='font-bold text-2xl my-6'>{header}</h3>
                        <p className='text-gray-600 text-xl'>{details}</p>
                    </div>
                    <div className='bg-slate-100 pl-8 py-4'>
                        <p className='flex items-center text-orange-600'>Step {number}</p>
                    </div>
                </div>
    )
}