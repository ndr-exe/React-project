import { cookies } from 'next/headers';
import './globals.css';
import { ReactNode } from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Header from './components/Header/Header';
import AppProvider from './components/Context-Provaiders/AppProvider';
import { fetchCartItems } from '../api';

export const metadata = {
  title: 'FastLag inc.',
  description: 'Generated by create next app',
};

async function checkPrefered() {
  'use server';
  const theme = cookies().get('darkMode');
  if (typeof theme === 'undefined') return '';

  return theme.value === 'true' ? 'dark' : '';
}

async function checkSystem() {
  const theme = cookies().get('darkMode');
  if (typeof theme === 'undefined') return 'system';
  return '';
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const dark = await checkPrefered();
  const system = await checkSystem();
  const cartItems = await fetchCartItems();

  return (
    <html lang="en" className={`${dark} min-h-dvh `}>
      <UserProvider>
        <AppProvider cartItems={cartItems}>
          <body className={`text-black dark:bg-black  dark:text-white ${system} `}>
            <div className="max-w-[1920px] mx-auto">
              <Header />
              <div className="mt-16 xl:mt-20">{children}</div>
            </div>
          </body>
        </AppProvider>
      </UserProvider>
    </html>
  );
}
