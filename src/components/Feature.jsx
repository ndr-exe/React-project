import {CheckIcon} from "@heroicons/react/24/outline"


export default function Feature({header,details}) {
  return (
    <div className='flex'>
            <div>
              <CheckIcon className='w-7 mr-4 text-green-600' />
            </div>
            <div>
              <h3 className='font-bold text-lg'>{header}</h3>
              <p className='text-lg pt-2 pb-4'>
                {details}
              </p>
            </div>
          </div>
  )
}
