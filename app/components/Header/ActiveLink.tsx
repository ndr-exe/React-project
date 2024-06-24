'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ActiveLink({ link, displayLink }: { link: string; displayLink: string }) {
  const pathname = usePathname();

  return (
    <Link
      className={`hover:text-orange-500 transition-colors ${
        pathname === link ? 'text-orange-600' : ''
      }`}
      href={link}
    >
      {displayLink}
    </Link>
  );
}
