'use client';
import Image from 'next/image';
import { RxPlus } from 'react-icons/rx';
import { RxMinus } from 'react-icons/rx';
import { HiOutlineTrash } from 'react-icons/hi2';

export default function CartItem({
  item,
  incr,
  rawItems,
}: {
  item: CartItem;
  incr: any;
  rawItems: any;
}) {
  return (
    <li className="pr-3 pl-2 py-2 rounded-lg border flex items-center gap-2 sm:gap-6 xl:pl-4 xl:py-4 xl:pr-4">
      <div className="w-[90px] sm:w-[120px] md:w-[140px] lg:w-[150px] xl:w-[160px] 2xl:w-[175px] ">
        <Image
          src="https://placehold.co/300x200/png"
          alt="title"
          width={300}
          height={200}
          className="w-full group-hover:-translate-y-10 dark:group-hover:outline dark:outline-gray-500 rounded-lg transition-transform "
        />
      </div>
      <div>
        <p className="mb-1 lg:text-lg xl:text-xl 2xl:text-2xl lg:mb-2 xl:mb-3 2xl:mb-4">
          {item.title}
        </p>
        <div className="flex w-4/5 lg:w-full h-full items-center justify-between">
          <button className="font-bold px-1 py-1 w-6 h-6 lg:w-8 lg:h-8 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 grid place-content-center rounded-md border">
            <RxMinus onClick={() => {}} className="xl:text-lg  2xl:text-xl" />
          </button>
          <p className="text-lg font-semibold xl:text-xl 2xl:text-2xl">{rawItems[item.id]}</p>
          <button
            onClick={() => incr(item.id)}
            className="font-bold px-1 py-1 w-6 h-6 lg:w-8 lg:h-8 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 grid place-content-center rounded-md border"
          >
            <RxPlus className="xl:text-lg 2xl:text-xl" />
          </button>
        </div>
      </div>
      <p className="ml-2 sm:ml-5 2xl:ml-10 font-meidum lg:text-lg xl:text-xl 2xl:text-2xl">
        ${item.price * item.count}
      </p>
      <button className="ml-auto text-lg md:text-xl border p-1.5 rounded-md lg:p-2.5 2xl:p-3">
        <HiOutlineTrash className="lg:text-xl 2xl:text-2xl" />
      </button>
    </li>
  );
}
