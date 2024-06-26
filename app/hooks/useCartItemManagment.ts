import { useOptimistic, useState, useTransition } from 'react';
import { useAppInfo } from '../components/Context-Provaiders/AppProvider';
import { updateCart } from '../../action';
import { calculateCartItemsPricesSum, returnFilteredItems } from '../../helperFunctions';

type Actions = 'increment' | 'decrement' | 'delete' | 'reset';

function reducer(state: ItemsRaw, action: { type: Actions; payload: number }) {
  const stateClone = { ...state };

  switch (action.type) {
    case 'increment':
      stateClone[action.payload]++;
      return stateClone;

    case 'delete':
      delete stateClone[action.payload];
      return stateClone;

    case 'decrement':
      stateClone[action.payload]--;
      return stateClone;

    case 'reset':
      return {};
  }
}

export default function useCartItemManagment(itemsRaw: ItemsRaw, items: CartItem[]) {
  const { productCountInCart, setProductsCountInCart } = useAppInfo();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<any>(null);
  const [optimisticItems, dispatch] = useOptimistic(returnFilteredItems(itemsRaw, items), reducer);
  const pricesSum = calculateCartItemsPricesSum(items, optimisticItems);

  async function handleIncrement(id: number) {
    startTransition(() => setProductsCountInCart(productCountInCart! + 1));
    startTransition(() => dispatch({ type: 'increment', payload: id }));
    const updated = reducer(optimisticItems, { type: 'increment', payload: id });
    const hehe = await updateCart(updated);
    if (hehe.error) setError('could not fetch the data');
  }

  async function handleDecrement(id: number) {
    if (optimisticItems[id] === 1) {
      handeDelete(id);
      return;
    }
    startTransition(() => setProductsCountInCart(productCountInCart! - 1));
    startTransition(() => dispatch({ type: 'decrement', payload: id }));
    const updated = reducer(optimisticItems, { type: 'decrement', payload: id });
    const hehe = await updateCart(updated);
    if (hehe.error) setError('could not fetch the data');
  }

  async function handeDelete(id: number) {
    startTransition(() => setProductsCountInCart(productCountInCart! - optimisticItems[id]));
    startTransition(() => dispatch({ type: 'delete', payload: id }));
    const updated = reducer(optimisticItems, { type: 'delete', payload: id });
    const hehe = await updateCart(updated);
    if (hehe.error) setError('could not fetch the data');
  }

  async function handleReset() {
    startTransition(() => setProductsCountInCart(0));
    startTransition(() => dispatch({ type: 'reset', payload: 999 }));
    const hehe = await updateCart({});
    if (hehe.error) setError('could not fetch the data');
  }

  return {
    handleIncrement,
    handleDecrement,
    handeDelete,
    handleReset,
    optimisticItems,
    pricesSum,
    error,
    isPending,
  };
}
