'use client';
import { useState } from 'react';
import { CgOptions } from 'react-icons/cg';

export default function Options({ children }: { children: React.ReactNode }) {
  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <div>
      <div className="relative flex items-center">
        <button
          onClick={() => {
            setActiveMenu(p => !p);
            window.document.body.classList.add('overflow-y-hidden');
          }}
        >
          <CgOptions className="text-neutral-500 dark:text-neutral-300 lg:text-xl" />
        </button>
        <div
          className={`absolute w-[200px] xl:w-[225px] top-10 -left-5 sm:-left-10 bg-white border shadow-md text-sm px-2 pt-1 pb-4 dark:bg-black -translate-x-1/2 rounded-lg z-50 ${
            activeMenu ? 'animateOptions' : 'hidden'
            // 'animateOptions'
          }`}
        >
          {children}
        </div>
      </div>
      <div
        onClick={() => {
          setActiveMenu(false);
          window.document.body.classList.remove('overflow-y-hidden');
        }}
        className={`absolute top-0 left-0 w-screen h-screen bg-transparent z-40 ${
          activeMenu ? 'block' : 'hidden'
        }`}
      ></div>
    </div>
  );
}
