'use client';
import Image from 'next/image';
import { useState } from 'react';
import NavBarProfileDropdown from './NavBarProfileDropdown';

export default function NavbarProfile({ userInfo }: { userInfo: User }) {
  const [activeProfileDroodown, setActiveProfileDropdown] = useState(false);

  function handleClose() {
    setActiveProfileDropdown(false);
    window.document.body.classList.remove('overflow-y-hidden');
  }

  return (
    <div>
      <div className="relative">
        <button
          onClick={() => {
            setActiveProfileDropdown(p => !p);
            window.document.body.classList.add('overflow-y-hidden');
          }}
          className="relative rounded-full outline outline-1 outline-orange-600"
        >
          <div className="w-12 h-12 overflow-hidden">
            <Image
              src={userInfo.userInfo.user_metadata?.picture || userInfo.userInfo.picture}
              alt="avatar"
              width={50}
              height={50}
              className="rounded-full w-12 h-12"
            />
          </div>
        </button>
        <div
          className={`absolute w-[200px] xl:w-[225px] top-14 -left-12 sm:-left-14 bg-white border shadow-md text-sm px-2 pt-3 pb-4 dark:bg-black -translate-x-1/2 rounded-lg z-50 ${
            activeProfileDroodown ? 'animateOptions' : 'hidden'
          }`}
        >
          <NavBarProfileDropdown userInfo={userInfo} handleClose={handleClose} />
        </div>
      </div>
      <div
        onClick={() => {
          setActiveProfileDropdown(false);
          window.document.body.classList.remove('overflow-y-hidden');
        }}
        className={`absolute top-0 left-0 w-screen h-screen bg-transparent z-40 ${
          activeProfileDroodown ? 'block' : 'hidden'
        }`}
      ></div>
    </div>
  );
}
