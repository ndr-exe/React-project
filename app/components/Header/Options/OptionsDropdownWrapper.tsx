'use server';

import { cookies } from 'next/headers';
import { getThemeInfo } from '../../../../action';
import ThemeButton from './ThemeButton';
import LanguageButton from './LanguageButton';

export default async function OptionDropdownWrapper() {
  const theme = await getThemeInfo();
  const locale = cookies().get('locale');
  const lang = locale?.value;

  return (
    <div className="text-xl">
      <p className="font-bold border-b border-gray-500/60 pb-1 xl:pb-2 w-2/3">
        Options
      </p>
      <ul>
        <li className="xl:mb-1">
          <p className="mt-2 mb-1 ">Toggle Theme:</p>
          <span className="ml-2">
            <ThemeButton theme={theme} />
          </span>
        </li>
        <li>
          <p className="mt-1 mb-1">Change Language:</p>
          <span className="">
            <LanguageButton lang={lang as string} />
          </span>
        </li>
      </ul>
    </div>
  );
}
