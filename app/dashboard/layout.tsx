import { getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import React from 'react';
import { checkIfUserIsAdmin } from '../../userActions';
import { redirect } from 'next/navigation';
import { PiUsers } from 'react-icons/pi';

export default async function layout({ children }: { children: React.ReactNode }) {
  const isAdmin = await checkIfUserIsAdmin();

  if (!isAdmin) redirect('/');

  return (
    <div className="flex max-w-screen-lg h-[calc(200vh-80px)] h-max[calc(200vh-80px)] mx-auto">
      <div className="w-1/6 bg-gray-200/50 dark:bg-gray-800/60 relative px-1">
        <nav className="w-full rounded-xl py-6 px-5 flex justify-center border border-gray-200/80 dark:bg-black dark:border-indigo-800 bg-white sticky top-36">
          <ul className="flex flex-col gap-3">
            <li>
              <Link href="/dashboard/items">Items</Link>
            </li>
            <li>
              <Link href={'users'}>Users</Link>
            </li>
            <li>
              <Link href={'orders'}>Orders</Link>
            </li>
            <li>
              <Link href={'blog'}>Blog</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-full ">{children}</div>
    </div>
  );
}
