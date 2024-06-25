'use client';
import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';

import ActiveLink from './ActiveLink';

export default function HamburgerMenu() {
  const [activeMenu, setActiveMenu] = useState(false);
  return (
    <div className="mr-auto md:hidden">
      <button
        onClick={() => {
          setActiveMenu(p => !p);
          window.document.body.classList.toggle('overflow-y-hidden');
        }}
      >
        {activeMenu ? (
          <IoClose className="text-2xl text-orange-600 " />
        ) : (
          <RxHamburgerMenu className="text-2xl text-neutral-400 hover:text-orange-600 transition-colors" />
        )}
      </button>
      <div
        className={`absolute w-screen h-screen bg-white dark:bg-black overflow-y-hidden top-0 left-0 -translate-x-full mt-16 z-10 transition-transform ${
          activeMenu && 'translate-x-0 '
        }`}
      >
        <div className="block md:mr-auto text-2xl">
          <ul
            className="flex flex-col pl-5 pt-6 gap-4 xl:gap-5"
            onClick={() => setActiveMenu(p => !p)}
          >
            <li className="">
              <ActiveLink link="/" displayLink="Home" />
            </li>
            <li className="">
              <ActiveLink link="/shop" displayLink="Shop" />
            </li>
            <li className="">
              <ActiveLink link="/blog" displayLink="Blog" />
            </li>
            <li className="">
              <ActiveLink link="/contact" displayLink="Contact Us" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
