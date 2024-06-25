'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import first from '../../../../public/img/pexels-goumbik-669283.jpg';
import second from '../../../../public/img/pexels-karolina-grabowska-5202434.jpg';
import third from '../../../../public/img/pexels-pixabay-163443.jpg';
import fourth from '../../../../public/img/pexels-tima-miroshnichenko-6204669.jpg';
import SlideInfo from './SlideInfo';

const thumbs = [
  <Image
    src={first}
    alt="slide"
    fill
    key={0}
    placeholder="blur"
    className="animate-fade animate-duration-1000 animate-ease-in bg-blend-overlay"
  />,
  <Image
    src={second}
    alt="slide"
    fill
    key={1}
    placeholder="blur"
    className="animate-fade animate-duration-1000 animate-ease-in bg-blend-darken"
  />,
  <Image
    src={third}
    alt="slide"
    fill
    key={2}
    placeholder="blur"
    className="animate-fade animate-duration-1000 animate-ease-in"
  />,
  <Image
    src={fourth}
    alt="slide"
    fill
    key={3}
    placeholder="blur"
    className="animate-fade animate-duration-1000 animate-ease-in"
  />,
];

const info = [
  <SlideInfo
    key={10}
    heading="lorem Lorem, ipsum dolor sit amet"
    details="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
  aperiam mollitia maxime."
  />,
  <SlideInfo
    key={11}
    heading="lorem Lorem, ipsum dolor sit amet"
    details="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
  aperiam mollitia maxime."
  />,
  <SlideInfo
    key={12}
    heading="lorem Lorem, ipsum dolor sit amet"
    details="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
  aperiam mollitia maxime."
  />,
  <SlideInfo
    key={13}
    heading="lorem Lorem, ipsum dolor sit amet"
    details="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
  aperiam mollitia maxime."
  />,
];

export default function MainSlider() {
  const [currImageIdx, setCurrImageIdx] = useState(0);
  const timerRef = useRef<null | number>(null);

  function handleClick(id: number) {
    setCurrImageIdx(id);
  }

  function resetTimeout() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timerRef.current = window.setTimeout(
      () =>
        setCurrImageIdx(p => {
          if (p < 3) {
            return p + 1;
          } else {
            return 0;
          }
        }),
      5000
    );

    return () => resetTimeout();
  }, [currImageIdx]);

  return (
    <section className="min-w-full">
      <div className="w-full mx-auto bg-black">
        <div className="w-full h-[350px] md:h-[400px] lg:h-[500px] xl:h-[700px] 2xl:h-[900px] relative ">
          <div className="bg-gradient-to-b from-slate-900 to-black absolute top-0 w-full h-full z-10 opacity-70"></div>
          {thumbs[currImageIdx]}
          {info[currImageIdx]}
        </div>
      </div>
      <div className="bg-white dark:bg-black w-full h-[90px] md:h-[100px] lg:h-[115px] xl:h-[150px] 2xl:h-[230px] mx-auto">
        <ul className="flex gap-4 2xl:gap-7 justify-center items-center h-full">
          {thumbs.map(thumb => {
            const isActive = Number(thumb.key) === currImageIdx ? true : false;
            return (
              <div
                key={thumb.key}
                className={`rounded-lg p-0.5 xl:p-1 2xl:p-[6px] grid place-content-center outline-1 xl:outline-2 2x:outline-4 outline-transparent ${
                  isActive && 'applyOutline'
                }`}
              >
                <button
                  className={`overflow-hidden rounded-lg blur-[1px]
                  ${isActive && 'bluredThumb'}`}
                  onClick={() => handleClick(Number(thumb.key))}
                >
                  <div className="w-[60px] h-[40px] md:w-[80px] md:h-[60px] lg:w-[90px] lg:h-[70px] xl:w-[120px] xl:h-[90px] 2xl:w-[250px] 2xl:h-[140px] relative">
                    {thumb}
                  </div>
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
