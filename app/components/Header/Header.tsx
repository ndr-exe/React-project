import Image from 'next/image';
import logo from '../../../public/img/Designer (1).png';
import HamburgerMenu from './HamburgerMenu';
import Options from './Options/Options';
import OptionDropdownWrapper from './Options/OptionsDropdownWrapper';
import { cookies } from 'next/headers';
import { getDictionary } from '../../../dictionaries';
import { getSession } from '@auth0/nextjs-auth0';
import Cart from '../Shop/Cart/CartIcon';
import { fetchAuth0UserWithMetadataAndRoles } from '../../../userActions';
import NavbarProfile from './NavbarProfile/NavbarProfile';
import ActiveLink from './ActiveLink';

export default async function Header() {
  const lang = cookies().get('locale')?.value;
  const { navbar } = await getDictionary(lang as string);
  const session = await getSession();
  const userInfo = session?.user && (await fetchAuth0UserWithMetadataAndRoles(session.user.sub));
  return (
    <nav className="w-full h-16 xl:h-20 flex px-4 bg-white items-center fixed  dark:bg-black top-0 z-50 max-w-[1920px] mx-auto">
      <HamburgerMenu />
      <div className="mr-auto hidden md:block md:mr-4">
        <Image src={logo} width={50} height={50} alt="logo" />
      </div>
      <div className="hidden md:block md:mr-auto">
        <ul className="flex gap-4 xl:gap-5">
          <li className="">
            <ActiveLink link="/" displayLink={navbar.home} />
          </li>
          <li className="">
            <ActiveLink link="/shop" displayLink={navbar.shop} />
          </li>
          <li className="">
            <ActiveLink link="/blog" displayLink={navbar.Blog} />
          </li>
          {/* <li className="">
            <ActiveLink link="/contact" displayLink="Conact Us" />
          </li> */}
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
          // <a
          //   href="/api/auth/logout"
          //   className="px-3 py-1.5 primary rounded-xl flex items-center text-white min-w-24 justify-center"
          // >
          //   {navbar.logout}
          // </a>
          <NavbarProfile userInfo={userInfo as User}></NavbarProfile>
        ) : (
          <a
            href="/api/auth/login"
            className="px-3 py-1.5 primary rounded-xl flex items-center text-white min-w-24 justify-center"
          >
            {navbar.login}
          </a>
        )}
      </div>
    </nav>
  );
}
