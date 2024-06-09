'use client';
import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';

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
        <RxHamburgerMenu className="text-2xl secondary" />
      </button>
      <div
        className={`absolute w-screen h-screen bg-blue-300 overflow-y-hidden top-0 left-0 -translate-x-full mt-16 z-10 transition-transform ${
          activeMenu && 'translate-x-0 '
        }`}
      ></div>
    </div>
  );
}
