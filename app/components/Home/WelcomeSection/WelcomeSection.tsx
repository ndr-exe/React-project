import pistol from '../../../../public/welcomeSection/handgun.png';
import rifle from '../../../../public/welcomeSection/m1grand.png';
import ammo from '../../../../public/welcomeSection/ammo.png';
import camo from '../../../../public/welcomeSection/camo.jpg';
import camoLeft from '../../../../public/welcomeSection/camoLeft.jpg';
import Image from 'next/image';
import transparent from '../../../../public/img/transparent.png';
import newImage from '../../../../public/welcomeSection/transparentNew.png';
import final from '../../../../public/welcomeSection/final.png';

export default function WelcomeSection() {
  return (
    <section className="mx-auto py-8 px-3 sm:px-10 sm:py-12 md:py-20 md:px-12 lg:h-[600px] lg:py-28 lg:flex lg:flex-col lg:flex-wrap lg:items-center lg:justify-center xl:h-[650px] xl:py-36 2xl:h-[800px] 2xl:py-52 2xl:w-4/5">
      <h2 className="text-3xl text-center lg:text-left lg:order-1 lg:w-2/5 xl:text-4xl 2xl:w-1/3">
        Introducing the PS5 console and accessories
      </h2>
      <div className="mt-7 lg:order-3 lg:w-1/2 lg:flex-grow ">
        <div className="mx-auto  w-fit relative">
          {/* <Image
            src={transparent}
            width={400}
            height={150}
            alt="logo"
            className="z-20"
          /> */}
          <Image
            src={final}
            width={400}
            height={150}
            alt="logo"
            className="z-20 sm:w-[550px] lg:w-[720px]"
          />
          <div className="w-4/5 absolute h-4/5 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-xl shadow-lg -z-10"></div>
        </div>
      </div>

      <div className="mt-8 text-center px-6 lg:text-left lg:order-2 lg:px-0 lg:w-2/5 2xl:w-1/3 ">
        <h3 className="text-xl mb-2 text-[#386C5F] sm:text-2xl  xl:text-3xl  ">
          Feel a New Real
        </h3>
        <p className="sm:text-xl xl:text-2xl ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
          facilis in maiores culpa illum nemo.
        </p>
        <div className="mt-5 flex gap-5 w-fit mx-auto sm:mt-8 lg:justify-start lg:mx-0 2xl:gap-8 2xl:mt-10">
          <button className="px-3 py-2 bg-[--color-primary] rounded-2xl text-white sm:text-xl xl:text-2xl xl:py-3 xl:px-4  ">
            Find out more
          </button>
          <button className="px-3 py-2 bg-[--color-secondary] rounded-2xl text-white sm:text-xl xl:text-2xl xl:py-3 xl:px-4">
            Buy now
          </button>
        </div>
      </div>
    </section>
  );
}
