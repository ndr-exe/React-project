'use client';
import Item from './Item';
import useOptimisticAddToCartButton from '../../hooks/useOptimisticAddToCartButton';
import { useEffect, useState } from 'react';
import { fetchItems } from '../../../api';

export default function GridWrapper({
  cart,
  isLogged,
  items,
}: {
  cart: any;
  isLogged: boolean;
  items: ItemWithReviews[];
}) {
  const [initialItemsState, setInitialItemsState] = useState(items);
  const { handleIncrement } = useOptimisticAddToCartButton(cart);

  return (
    <ul className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:px-2 gap-14 sm:gap-12 md:gap-x-0 lg:gap-y-20 py-8">
      {initialItemsState.map((item: ItemWithReviews) => {
        return (
          <Item
            key={item.id + Math.round(Math.random() * 100)}
            item={item}
            cart={cart}
            handleIncrement={handleIncrement}
            isLogged={isLogged}
          />
        );
      })}
    </ul>
  );
}
