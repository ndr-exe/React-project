'use client';

import { useState, useEffect } from 'react';

import { CiDark } from 'react-icons/ci';
import { GiBleedingEye } from 'react-icons/gi';
import { setDarkMode } from '../../../../action';

export default function ThemeButton({ theme, options }: { theme: boolean; options: LocalDict }) {
  const [isDarkMode, setIsDarkMode] = useState(theme);

  useEffect(() => {
    //USER THAT HASN'T CHANED THEME YET USE SYSTEM SETTINGS
    if (document.body.classList.contains('system')) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
        setIsDarkMode(true);
        return;
      }
    }
  }, []);

  async function handleThemeChange() {
    if (document.body.classList.contains('system')) document.body.classList.remove('system');
    document.documentElement.classList.toggle('dark');
    await setDarkMode('darkMode', !isDarkMode);
    setIsDarkMode(prev => !prev);
  }

  return (
    <div className="flex-grow flex justify-center">
      <button
        onClick={handleThemeChange}
        className={`text-lg px-2 flex justify-center items-center border rounded-md group ${
          isDarkMode ? 'hover:bg-white' : 'hover:bg-black'
        }`}
      >
        {isDarkMode ? (
          <span className="flex items-center text-yellow-400 group-hover:text-black ">
            {options.light}
            <GiBleedingEye />
          </span>
        ) : (
          <span className="flex items-center group-hover:text-white">
            {options.dark}
            <CiDark />
          </span>
        )}
      </button>
    </div>
  );
}
