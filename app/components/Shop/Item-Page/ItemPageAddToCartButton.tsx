'use client';

import Link from 'next/link';
import useOptimisticAddToCartButton from '../../../hooks/useOptimisticAddToCartButton';

export default function ItemPageButton({
  cart,
  id,
  isLogged,
}: {
  cart: any;
  id: number;
  isLogged: boolean;
}) {
  const { handleIncrement, disabled } = useOptimisticAddToCartButton(cart);

  if (!isLogged) {
    return (
      <a
        href="/api/auth/login"
        className="flex items-center justify-center px-4 py-2 text-xl rounded-xl bg-black text-white w-full text-center xl:py-3 xl:text-2xl hover:bg-white hover:outline-black hover:outline hover:font-bold hover:text-black dark:border-white  dark:hover:bg-white dark:outline dark:outline-1 dark:outline-white dark:hover:text-black transition-colors"
      >
        Add to Cart
      </a>
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={() => {
        handleIncrement(id);
      }}
      className="flex items-center justify-center px-4 py-2 text-xl rounded-xl bg-black text-white w-full text-center xl:py-3 xl:text-2xl hover:bg-white hover:outline-black hover:outline hover:font-bold hover:text-black dark:border-white  dark:hover:bg-white dark:outline dark:outline-1 dark:outline-white dark:hover:text-black transition-colors"
    >
      {!disabled ? 'Add to Cart' : 'spinner'}
    </button>
  );
}
