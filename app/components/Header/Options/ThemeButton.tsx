'use client';

import { useState, useEffect } from 'react';

import { CiDark } from 'react-icons/ci';
import { GiBleedingEye } from 'react-icons/gi';
import { setDarkMode } from '../../../../action';

export default function ThemeButton({ theme }: { theme: boolean }) {
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
    if (document.body.classList.contains('system'))
      document.body.classList.remove('system');
    document.documentElement.classList.toggle('dark');
    await setDarkMode('darkMode', !isDarkMode);
    setIsDarkMode(prev => !prev);
  }

  return (
    <button onClick={handleThemeChange} className="text-lg xl:text-2xl ">
      {isDarkMode ? (
        <span className="flex items-center text-yellow-400">
          Light
          <GiBleedingEye />
        </span>
      ) : (
        <span className="flex items-center">
          Dark
          <CiDark />
        </span>
      )}
    </button>
  );
}
