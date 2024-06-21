import { getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import React from 'react';
import { checkIfUserIsAdmin } from '../../userActions';
import { redirect } from 'next/navigation';

export default async function layout({ children }: { children: React.ReactNode }) {
  // const session = await getSession();
  const isAdmin = await checkIfUserIsAdmin();
  // console.log(isAdmin);
  if (!isAdmin) redirect('/');

  return (
    <div className="flex max-w-screen-lg h-[calc(100vh-80px)] h-max[calc(100vh-80px)] mx-auto">
      <nav className="w-1/6 bg-red-300">
        <ul>
          <li>
            <Link href="items">Items</Link>
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
      <div className="w-full ">{children}</div>
    </div>
  );
}
