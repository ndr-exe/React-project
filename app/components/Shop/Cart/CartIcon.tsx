'use client';

import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';
import { useAppInfo } from '../../Context-Provaiders/AppProvider';

export default function Cart() {
  const cartContext = useAppInfo();

  return (
    <Link href="/cart" className="text-2xl md:text-3xl mr-4 relative">
      <IoCartOutline className="dark:text-white" />
      <span className="text-sm absolute -top-3 left-1.5 md:-top-4 md:left-2 rounded-full flex justify-center items-center dark:text-white text-white bg-orange-600 w-4 h-4 md:w-5 md:h-5">
        {cartContext?.productCountInCart}
      </span>
    </Link>
  );
}
