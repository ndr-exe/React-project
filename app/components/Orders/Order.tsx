'use client';
import { useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import { BsCheck2Circle } from 'react-icons/bs';
import { formatISODateToCustom, formatShortDate } from '../../../helperFunctions';
import { CiLocationOn } from 'react-icons/ci';

import Image from 'next/image';

export default function Order({ order }: { order: any }) {
  const [showOrder, setShowOrder] = useState(false);
  const [closeFilters, setCLoseFilters] = useState(false);
  console.log(order.order_info.items);

  return (
    <div className="w-full border rounded-lg px-3 md:pt-2 md:px-5 text-md gradientBgFirst first-child text-xs sm:text-sm md:text-base lg:text-lg xl:text-base max-w-4xl">
      <div className="w-full mx-auto items-center  text-md">
        <button
          onClick={showOrder ? () => setCLoseFilters(p => !p) : () => setShowOrder(p => !p)}
          className="w-full h-20 flex justify-between items-center "
        >
          <div className="flex flex-col">
            <span className="text-gray-300">Order#</span>
            <span className="text-white">{order.id}</span>
          </div>
          <div className="flex flex-col items-center ">
            <span className="text-gray-300">Delivered</span>
            <span className="text-white">
              <BsCheck2Circle className="text-lg text-white" />
            </span>
          </div>
          <div className="flex flex-col ">
            <span className="text-gray-300">Total</span>
            <span className="text-white">${order.order_info.total / 100}</span>
          </div>
          <div className="flex flex-col ">
            <span className="text-gray-300">Purchase Date</span>
            <span className="text-white">{formatISODateToCustom(order.created_at)}</span>
          </div>
          <div
            className={`border rounded-full w-6 h-6  place-content-center transition-transform hidden sm:grid
                ${showOrder && '-rotate-180'}`}
          >
            <IoIosArrowUp className={`text-white  `} />
          </div>
          {/* <span>FILTER ITEMS</span>
          <span className="text-xl">
            <IoIosArrowUp />
          </span> */}
        </button>
      </div>
      {showOrder && (
        <div className={`overflow-hidden pb-5`}>
          <div
            onAnimationEnd={() => closeFilters && (setShowOrder(false), setCLoseFilters(false))}
            className={` sm:py-4 sm:px-4 applyFilterAnimation ${
              closeFilters && 'applyFilterAnimationClose'
            }`}
          >
            <ul>
              <li>
                <p className="text-gray-400 flex items-center gap-1">Delivery Address:</p>
                <div className="flex gap-3">
                  <span className="flex gap-1 items-center text-white">
                    <CiLocationOn />

                    {`${order.order_info.address.line1} ${order.order_info.address.line1}`}
                  </span>
                  <span className="text-white">
                    <span className="text-gray-400">City: </span>
                    {order.order_info.address.city}
                  </span>
                  <span className="text-white">
                    <span className="text-gray-400">Country: </span>

                    {order.order_info.address.country}
                  </span>
                </div>
              </li>
              <div className="mt-5 text-white">
                <div className="flex justify-between text-gray-300 mb-5 w-full  mx-auto">
                  <p className="w-16 sm:w-20 md:w-24 lg:w-24 text-neutral-400 ">Thumbnail</p>
                  <p className="w-1/5 text-center text-neutral-400">Quantity</p>
                  <p className="w-1/5 text-center text-neutral-400">Price Total</p>
                  <p className="w-1/4 text-center text-neutral-400">Item</p>
                </div>
                <div className="flex  w-full flex-col gap-4">
                  {order.order_info.items.map((item: any, idx: number) => {
                    return (
                      <li
                        key={idx}
                        className="flex justify-between border border-neutral-300 rounded-lg w-full mx-auto overflow-hidden "
                      >
                        <div className="relative w-16 sm:w-20 md:w-24 lg:w-24 aspect-[4/3]  ">
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="w-1/5 text-center grid place-content-center">{item.count}</p>
                        <p className="w-1/5 text-center grid place-content-center ">
                          ${item.total / 100}
                        </p>
                        <p className="w-1/4 text-center grid place-content-center  ">
                          {item.title}
                        </p>
                      </li>
                    );
                  })}
                </div>
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
