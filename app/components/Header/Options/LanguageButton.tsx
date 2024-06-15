'use client';

import { useRouter } from 'next/navigation';
import { handleLangChange } from '../../../../action';
import Image from 'next/image';
import geo from '../../../../public/flags/georgia.png';
import uk from '../../../../public/flags/united-kingdom.png';

export default function LocalSwitcher({ lang }: { lang: string; options: LocalDict }) {
  const router = useRouter();

  let activeEng = '';
  let activeGe = '';

  if (lang === 'en') {
    activeEng = 'outline outline-gray-400/30';
    activeGe = 'text-opacity-50 opacity-50';
  } else {
    activeEng = 'text-opacity-50 opacity-50';
    activeGe = 'outline outline-gray-400/30';
  }

  function handleClick(lang: string) {
    handleLangChange(lang);
    router.refresh();
  }

  return (
    <div className="flex gap-4 justify-center flex-grow">
      <button className={`${activeEng} h-full rounded-full`} onClick={() => handleClick('en')}>
        <Image src={uk} alt="Georgian Flag Icon" width={25} height={25} />
      </button>
      <button className={`${activeGe} h-full rounded-full`} onClick={() => handleClick('ge')}>
        <Image src={geo} alt="Georgian Flag Icon" width={25} height={25} />
      </button>
    </div>
  );
}
