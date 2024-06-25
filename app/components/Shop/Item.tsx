import Image from 'next/image';
import AddToCartButton from './AddToCartButton';
import { fetchCartItems } from '../../../api';
import useOptimisticAddToCartButton from '../../hooks/useOptimisticAddToCartButton';
import Rating from './Rating';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Item({
  item,
  cart,
  handleIncrement,
  isLogged,
}: {
  item: ItemWithReviews;
  cart: any;
  handleIncrement: any;
  isLogged: boolean;
}) {
  return (
    <li
      className={` rounded-xl  shadow-md  w-[300px] sm:w-[350px] lg:w-[280px] 2xl:w-4/5 dark:shadow-none dark:outline outline-neutral-500 outline-1  overflow-hidden group`}
    >
      <Link href={`shop/${item.id}`}>
        <div className="overflow-hidden w-full aspect-[6/4] relative ">
          <Image
            src={item.thumbnail}
            // src="https://placehold.co/300x200/png"
            alt={item.title}
            fill
            className={`rounded-t-xl group-hover:scale-110  scale object-cover`}
          />
        </div>
      </Link>
      <div className="pl-4 py-4 2xl:py-6">
        <Link href={`shop/${item.id}`}>
          <p className="font-bold text-xl group-hover:text-orange-500 transition-colors">
            {item.title}
          </p>
        </Link>
        <p className="text-gray-500 mb-1 group-hover:text-orange-500 transition-colors">
          {item.category}
        </p>
        <Rating stars={item.stars} reviews={item.reviews} />
        <p className="text-2xl font-bold mt-3 2xl:mt-6">${item.price}</p>
        {isLogged ? (
          <AddToCartButton id={item.id} cart={cart} handleIncrement={handleIncrement} />
        ) : (
          <a
            href="/api/auth/login"
            className="mt-3 px-3 py-2 bg-black text-white rounded-md font-bold text-xl 2xl:mt-5 inline-block "
          >
            Add to Cart
          </a>
        )}
      </div>
    </li>
  );
}
