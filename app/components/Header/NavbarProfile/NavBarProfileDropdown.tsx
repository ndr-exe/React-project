import Link from 'next/link';
import React from 'react';

import { CiUser } from 'react-icons/ci';
import { PiArticleMedium } from 'react-icons/pi';
import { FaRegStarHalf } from 'react-icons/fa';
import { PiPackage } from 'react-icons/pi';
import { MdLogout } from 'react-icons/md';

export default function NavBarProfileDropdown({
  userInfo,
  handleClose,
}: {
  userInfo: User;
  handleClose: () => void;
}) {
  return (
    <div className="">
      <div className="text-center border-b pb-1">
        <p className="flex gap-2 justify-center text-sm xl:text-base text-gray-400">
          <span>
            {userInfo.userInfo.user_metadata?.firstName ||
              userInfo.userInfo.given_name ||
              userInfo.userInfo.name}
          </span>

          <span>
            {userInfo.userInfo.user_metadata?.familyName || userInfo.userInfo.family_name}
          </span>
        </p>
        <p className="font-semibold xl:text-lg">
          {userInfo.userInfo.user_metadata?.username ||
            userInfo.userInfo.username ||
            userInfo.userInfo.nickname}
        </p>
      </div>
      <ul className="flex flex-col gap-1 px-2 pt-3 xl:text-base xl:gap-1.5">
        <li>
          <Link
            onClick={() => handleClose()}
            href="/profile"
            className="flex items-center gap-1 hover:text-[#378058] transition-colors"
          >
            <CiUser />
            Profile
          </Link>
        </li>

        <li>
          <Link
            onClick={() => handleClose()}
            href="/profile"
            className="flex items-center gap-1 hover:text-[#378058] transition-colors"
          >
            <PiArticleMedium />
            Your Blogs
          </Link>
        </li>
        <li>
          <Link
            onClick={() => handleClose()}
            href="/orders"
            className="flex items-center gap-1 hover:text-[#378058] transition-colors"
          >
            <FaRegStarHalf />
            Reviews
          </Link>
        </li>
        <li>
          <Link
            onClick={() => handleClose()}
            href="/orders"
            className="flex items-center gap-1 hover:text-[#378058] transition-colors"
          >
            <PiPackage />
            Orders
          </Link>
        </li>
        <li className="flex justify-center mt-2">
          <a
            href="/api/auth/logout"
            className="flex items-center gap-1 transition-colors border py-1 px-2 rounded-md hover:text-[#e14559]"
          >
            <MdLogout />
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}
