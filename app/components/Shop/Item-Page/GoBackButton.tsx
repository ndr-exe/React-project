'use client';
import Link from 'next/link';
import { IoChevronBack } from 'react-icons/io5';

export default function GoBackButton({
  link,
  linkToDisplay,
}: {
  link: string;
  linkToDisplay: string;
}) {
  return (
    <Link href={link} className="w-fit flex items-center hover:text-orange-600 transition-colors ">
      {' '}
      <IoChevronBack className="text-xl" />
      Back To {linkToDisplay}
    </Link>
  );
}
