'use server';

import { cookies } from 'next/headers';
import { getThemeInfo } from '../../../../action';
import { getDictionary } from '../../../../dictionaries';
import ThemeButton from './ThemeButton';
import LanguageButton from './LanguageButton';

export default async function OptionDropdownWrapper() {
  const theme = await getThemeInfo();
  const locale = cookies().get('locale')?.value;
  const { options } = await getDictionary(locale as string);
  const lang = locale;

  return (
    <div className="text-lg px-3">
      <p className="font-bold border-b border-gray-500/60 pb-1 pt-1 xl:pb-2">{options.options}</p>
      <ul className="xl:pt-2">
        <li className="flex flex-col items-center xl:mb-1 xl:flex-row xl:justify-between">
          <p className="mt-2 mb-1 text-center text-gray-500 min-w-16">{options.toggleTheme}</p>
          <ThemeButton theme={theme} options={options} />
        </li>
        <li className="xl:flex items-center justify-between">
          <p className="mt-1 mb-1 text-center text-gray-500 min-w-16">{options.toggleLang}</p>
          <LanguageButton lang={lang as string} options={options} />
        </li>
      </ul>
    </div>
  );
}
