'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CiEdit } from 'react-icons/ci';

export default function EditBlogpostButton({ link }: { link: string }) {
  const router = useRouter();
  return (
    <button
      className="text-3xl hover:text-orange-600 hover:opacity-100 transition-colors"
      onClick={() => {
        router.push(`blog/edit/${link}`);
      }}
    >
      <CiEdit />
    </button>
  );
}
