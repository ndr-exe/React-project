import Image from 'next/image';
import AddToCartButton from './AddToCartButton';
import { fetchCartItems } from '../../../api';
import useOptimisticAddToCartButton from '../../hooks/useOptimisticAddToCartButton';
import Rating from './Rating';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useRef, useState } from 'react';

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
  // useEffect(()=>{
  //   imgRef.current!.classList
  // },[imgRef])

  return (
    <li
      className={` rounded-xl  shadow-md w-[300px] sm:w-[350px] lg:w-[280px] 2xl:w-4/5 dark:outline outline-gray-500 overflow-hidden group`}
    >
      <div className="overflow-hidden">
        <Image
          src="https://placehold.co/300x200/png"
          alt={item.title}
          width={300}
          height={200}
          className={`w-full dark:outline-gray-500 rounded-t-xl group-hover:scale-125 transition-transform `}
        />
      </div>
      <div className="pl-4 py-4 2xl:py-6 hover:text-blue-400">
        <p className="font-bold text-xl">{item.title}</p>
        <p className="text-gray-500 mb-1">{item.category}</p>
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
