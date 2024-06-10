'use client';
import Item from './Item';
import useOptimisticAddToCartButton from '../../hooks/useOptimisticAddToCartButton';

export default function GridWrapper({ cart, items }: { cart: any; items: any }) {
  const { handleIncrement } = useOptimisticAddToCartButton(cart);
  return (
    <ul className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-2 gap-10 sm:gap-12 md:gap-x-0 lg:gap-y-20">
      {items.map((item: Item) => {
        return <Item key={item.id} item={item} cart={cart} handleIncrement={handleIncrement} />;
      })}
    </ul>
  );
}
