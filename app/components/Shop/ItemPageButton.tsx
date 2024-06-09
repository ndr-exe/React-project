'use client';

import { useState } from 'react';
import { useAppInfo } from '../Context-Provaiders/AppProvider';
import { updateCart } from '../../../action';

export default function ItemPageButton({
  cart,
  id,
}: {
  cart: any;
  id: number;
}) {
  const [cartState, setCartState] = useState<CartProducts>(() => {
    if (cart.empty) return { 0: 0 };
    return cart;
  });
  const cartContext = useAppInfo();

  function handleClick(id: number) {
    cartContext?.setProductsCountInCart(prev => prev + 1);

    if (typeof cartState[id] === 'undefined') {
      const updatedCartState = { ...cartState, [id]: 1 };
      setCartState(updatedCartState);
      updateCart(updatedCartState);
      return;
    }
    if (typeof cartState[id] !== 'undefined') {
      const updatedCartState = { ...cartState, [id]: cartState[id] + 1 };
      setCartState(updatedCartState);
      updateCart(updatedCartState);
      return;
    }
  }
  return (
    <button
      onClick={() => handleClick(id)}
      className="block px-4 py-2 text-xl rounded-xl bg-black text-white w-full text-center"
    >
      Add to Cart
    </button>
  );
}
