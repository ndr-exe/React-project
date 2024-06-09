'use client';

import { useOptimistic, useState, useTransition } from 'react';
import { useAppInfo } from '../../Context-Provaiders/AppProvider';
import CartItem from './CartItem';
import { updateCart } from '../../../../action';

function reducer(state: ItemsRaw, action: { type: 'increment'; payload: number }) {
  switch (action.type) {
    case 'increment':
      const updatedCartState = {
        ...state,
        [action.payload]: state[action.payload] + 1,
      };

      console.log(updatedCartState);
      return updatedCartState;
  }
}

export default function CartList({ items, itemsRaw }: { items: CartItem[]; itemsRaw: ItemsRaw }) {
  const cartContext = useAppInfo();
  const [isPending, startTransition] = useTransition();
  // const [rawItems, setRawItems] = useState(() => itemsRaw);
  const [error, setError] = useState<any>(null);
  const [optimisticItems, dispatch] = useOptimistic(itemsRaw, reducer);

  async function handleIncrement(id: number) {
    startTransition(() => dispatch({ type: 'increment', payload: id }));
    const updated = reducer(optimisticItems, { type: 'increment', payload: id });
    const hehe = await updateCart(updated);
    if (hehe.error) setError('could not fetch the data');

    // setRawItems((prev: ItemsRaw) => {
    //   const updatedItems = reducer(prev, { type: 'increment', payload: id });
    //   return updatedItems;
    // });
  }
  console.log(error);
  return (
    <main className="py-5 px-4 lg:px-9 xl:px-12 2xl:px-20">
      <div className="flex flex-col gap-4 xl:gap-6 lg:flex-row lg:justify-between">
        <div className="">
          <h1 className="text-xl font-bold xl:text-xl 2xl:text-2xl xl:mb-2">Your Cart</h1>
          <p className="text-md text-gray-500 2xl-text-lg">
            Review and manage the items in your cart.
          </p>
        </div>
        <button className="text-lg xl:text-xl px-4 py-2 rounded-md border w-fit lg:self-center">
          Clear Cart
        </button>
      </div>
      <div>
        <ul className="mt-5 grid grid-cols-1 gap-4">
          {items.map((item: CartItem) => {
            return (
              <CartItem
                key={item.id}
                item={item}
                incr={handleIncrement}
                rawItems={optimisticItems}
                // itemRaw={optimisticItems[item.id.toString()]}
                // seter={(obj: any) => setOptimisticItems(obj)}
                // hehe={(obj: any) => handeIncrement(obj)}
              />
            );
          })}
        </ul>
        <div className="mt-4 xl:mt-5 2xl:mt-6 flex flex-col gap-3 xl:gap-5 lg:flex-row lg:justify-between lg:max-h-fit">
          <div>
            <p className="text-xl xl:text-2xl font-bold xl:mb-2 2xl:mb-3">Total</p>
            <p className="text-xl xl:text-3xl font-bold">$123.94</p>
          </div>
          <button
            onClick={() => startTransition(() => dispatch({ type: 'increment', payload: 2 }))}
            className="bg-black text-white text-lg px-6 py-2 rounded-lg border md:w-fit xl:text-xl 2xl:text-2xl xl:px-7 xl:py-3 lg:self-center"
          >
            Proceed to Chechkout
          </button>
        </div>
      </div>
    </main>
  );
}
