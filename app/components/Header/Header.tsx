import { RxHamburgerMenu } from 'react-icons/rx';
import { CgOptions } from 'react-icons/cg';
import Image from 'next/image';
import logo from '/Users/miminodar/Desktop/360fx360f.png';
import HamburgerMenu from './HamburgerMenu';
import Options from './Options/Options';
import OptionDropdownWrapper from './Options/OptionsDropdownWrapper';
import { cookies } from 'next/headers';
import { getDictionary } from '../../../dictionaries';
import { getSession } from '@auth0/nextjs-auth0';
import Cart from '../Shop/Cart/CartIcon';

export default async function Header() {
  const lang = cookies().get('locale')?.value;
  const dict = await getDictionary(lang as string);
  const session = await getSession();
  return (
    <nav className="w-full h-16 xl:h-20 flex px-4 bg-white items-center fixed  dark:bg-black top-0 z-50 max-w-[1920px] mx-auto">
      <HamburgerMenu />
      <div className="mr-auto hidden md:block md:mr-4">
        <Image src={logo} width={50} height={50} alt="logo" />
      </div>
      <div className="hidden md:block md:mr-auto">
        <ul className="flex gap-3">
          <li>
            <a href="/">{dict.filters.groceries}</a>
          </li>
          <li>
            <a href="/">Collection</a>
          </li>
          <li>
            <a href="/">Blog</a>
          </li>
        </ul>
      </div>

      <div className="absolute right-1/2 md:hidden translate-x-1/2">
        <Image src={logo} width={50} height={50} alt="logo" />
      </div>

      {session?.user && <Cart />}

      <div className="mr-3">
        <Options>
          <OptionDropdownWrapper />
        </Options>
      </div>
      <div>
        {session?.user ? (
          <a
            href="/api/auth/logout"
            className="px-3 py-1 primary rounded-xl flex items-center text-white"
          >
            Log out
          </a>
        ) : (
          <a
            href="/api/auth/login"
            className="px-3 py-1 primary rounded-xl flex items-center text-white"
          >
            Sign in
          </a>
        )}
      </div>
    </nav>
  );
}
