'use client';

import { useRouter } from 'next/navigation';
import useOptimisticAddToCartButton from '../../hooks/useOptimisticAddToCartButton';

export default function AddToCartButton({
  id,
  cart,
  handleIncrement,
}: {
  id: number;
  cart: any;
  handleIncrement: any;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        handleIncrement(id);
        router.refresh();
      }}
      className="mt-3 px-3 py-2 bg-black text-white rounded-md font-bold text-xl 2xl:mt-5 "
    >
      Add to Cart
    </button>
  );
}
