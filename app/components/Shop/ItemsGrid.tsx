'use client';
import Item from './Item';
import useOptimisticAddToCartButton from '../../hooks/useOptimisticAddToCartButton';

export default function ItemsGrid({
  cart,
  isLogged,
  items,
}: {
  cart: any;
  isLogged: boolean;
  items: ItemWithReviews[];
}) {
  const { handleIncrement } = useOptimisticAddToCartButton(cart);

  return (
    <ul className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:px-2 gap-14 sm:gap-12 md:gap-x-0 lg:gap-y-20 py-8">
      {items.map((item: ItemWithReviews) => {
        return (
          <Item
            key={item.id}
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
