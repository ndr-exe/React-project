'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import { FaCircleChevronLeft } from 'react-icons/fa6';

export default function ItemImageSLider({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const [elem, setElem] = useState('');
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  console.log(idx);
  function handleLeftMove() {
    setIdx(p => {
      if (p == 0) {
        console.log('hey');
        return 0;
      }
      return p - 1;
    });
  }
  function handleRightMove() {
    setIdx(p => {
      if (p == 2) {
        console.log('hey');
        return 2;
      }
      return p + 1;
    });
  }

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isRightSwipe) handleLeftMove();
    if (isLeftSwipe) handleRightMove();
    if (isLeftSwipe || isRightSwipe) console.log('swipe', isLeftSwipe ? 'left' : 'right');
  };

  let movingBy: string;
  if (idx === 2) {
    movingBy = '-translate-x-1/3  transition-transform duration-500 ease-in-out';
  }
  if (idx === 1) {
    movingBy = '-translate-x-0 transition-transform duration-500 ease-in-out';
  }
  if (idx === 0) {
    movingBy = 'translate-x-1/3 transition-transform duration-500 ease-in-out';
  }

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="w-full "
    >
      <section className="h-[400px] bg-transparent relative overflow-hidden w-full">
        <div className={`flex justify-center`}>
          <div className={`flex absolute calc h-full ${movingBy}`}>
            <div className=" w-full h-full relative">
              <Image
                src={images[0]}
                alt="product"
                fill
                className="object-scale-down  md:object-cover"
              />
            </div>

            <div className="w-full h-full  relative">
              <Image
                src={images[1]}
                alt="product"
                fill
                className="object-scale-down  md:object-cover"
              />
            </div>
            <div className="w-full h-full  relative">
              <Image
                src={images[0]}
                alt="product"
                fill
                className="object-scale-down  md:object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="py-3 flex gap-3 w-fit mx-auto items-center">
        <button onClick={() => handleLeftMove()}>
          <FaCircleChevronLeft className="text-orange-500 text-xl" />
        </button>
        <div className="flex">
          <GoDotFill
            className={`cursor-pointer ${
              idx === 0 ? 'text-orange-500 opacity-100 scale-125' : 'opacity-50 scale-100'
            }`}
            onClick={() => setIdx(0)}
          />
          <GoDotFill
            className={`cursor-pointer ${
              idx === 1 ? 'text-orange-500 opacity-100 scale-125' : 'opacity-50 scale-100'
            }`}
            onClick={() => setIdx(1)}
          />
          <GoDotFill
            className={`cursor-pointer ${
              idx === 2 ? 'text-orange-500 opacity-100 scale-125' : 'opacity-50 scale-100'
            }`}
            onClick={() => setIdx(2)}
          />
        </div>
        <button onClick={() => handleRightMove()}>
          <FaCircleChevronLeft className="rotate-180 text-orange-500 text-xl" />
        </button>
      </div>
    </div>
  );
}
