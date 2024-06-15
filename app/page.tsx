import HomeSlides from './components/Home/HomeSlides/HomeSlides';
import Image from 'next/image';
import first from '../public/img/pexels-goumbik-669283.jpg';
import WelcomeSection from './components/Home/WelcomeSection/WelcomeSection';

export default function page() {
  return (
    <main className="">
      <HomeSlides />
      <WelcomeSection />
      <div className="w-full h-[500px] bg-green-300"></div>
      <div className="w-full h-[500px] bg-red-400"></div>
      <div className="w-full h-[500px] bg-red-300"></div>
    </main>
  );
}
