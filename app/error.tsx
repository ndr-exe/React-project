'use client';
import { TfiFaceSad } from 'react-icons/tfi';

export default function Error() {
  return (
    <div className="w-full h-[calc(100vh-80px)] grid place-content-center ">
      <div className="col-span-9 h-full flex items-center justify-center">
        <h2 className="flex flex-col text-gray-400">
          <span className="text-6xl text-black">
            <TfiFaceSad className="dark:text-gray-600" />
            <span className="text-xl dark:text-gray-500">OOPS!</span>{' '}
          </span>
          <span className="text-xl">SOMETHING&apos;S WRONG, </span>
          <span>BUYING A NEW GUN MIGHT HELP</span>
          <span className="text-2xl ">
            GO BACK TO{' '}
            <a href="/shop" className="text-orange-600 hover:text-orange-800">
              SHOP
            </a>
          </span>
        </h2>
      </div>
    </div>
  );
}
