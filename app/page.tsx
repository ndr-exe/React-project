import HomeSlides from './components/Home/HomeSlides/HomeSlides';
import Image from 'next/image';
import WelcomeSection from './components/Home/WelcomeSection/WelcomeSection';
import Discover from '../app/components/Discovery/Discover';

export default function page() {
  return (
    <main className="">
      <HomeSlides />
      <WelcomeSection />
      <div>
        <Discover />
      </div>
    </main>
  );
}
