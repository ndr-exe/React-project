'use client';

import useOptimisticAddToCartButton from '../../../hooks/useOptimisticAddToCartButton';

export default function ItemPageButton({ cart, id }: { cart: any; id: number }) {
  const { handleIncrement, disabled } = useOptimisticAddToCartButton(cart);

  return (
    <button
      disabled={disabled}
      onClick={() => {
        handleIncrement(id);
      }}
      className="block px-4 py-2 text-xl rounded-xl bg-black text-white w-full text-center"
    >
      {!disabled ? 'Add to Cart' : 'spinner'}
    </button>
  );
}
