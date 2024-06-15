import Image from 'next/image';
// import logo from '/Users/miminodar/Downloads/Designer (6).png';
import logo from '../../../../public/bullet_s_front.jpg';
export default function SlideInfo({
  heading,
  details,
}: {
  heading: string;
  details: string;
}) {
  return (
    <div
      className="absolute items-center bottom-5 text-white animate-fade-up animate-duration-[2000ms] z-20 w-full px-5 sm:px-20 md:px-25 lg:px-12 lg:pb-8 xl:pb-12 xl:px-20 "
      key={0}
    >
      <div className="flex flex-col items-center gap-3 xl:gap-5 text-sm lg:items-start lg:w-[450px] lg:text-lg xl:text-2xl ">
        <div className="w-[80px] h-[80px] rounded-full flex justify-center items-center bg-black">
          <Image
            src={logo}
            alt="logo"
            width={50}
            height={50}
            className="ml-3"
          />
        </div>
        <h3 className="font-bold text-lg sm:text-xl xl:text-3xl">{heading}</h3>
        <p>{details}</p>
        <button className="px-3 py-1 xl:px-4 xl:py-2 bg-white rounded-xl border border-black text-black text-sm lg:text-lg xl:text-xl mt-3 xl:mt-5 dark:bg-black dark:text-white dark:border-white ">
          Find Out More
        </button>
      </div>
    </div>
  );
}
