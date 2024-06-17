'use client';
import { useRouter } from 'next/navigation';
import { IoChevronBack } from 'react-icons/io5';

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="">
      <IoChevronBack />
      Back to Shop
    </button>
  );
}
