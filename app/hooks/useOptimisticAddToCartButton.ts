import { useState, useTransition } from 'react';
import { useAppInfo } from '../components/Context-Provaiders/AppProvider';
import { updateCart } from '../../action';

export default function useOptimisticAddToCartButton(cart: any) {
  const [pending, setTransition] = useTransition();
  const [cartState, setCartState] = useState(() => cart);
  console.log(cartState);

  const { productCountInCart, setProductsCountInCart } = useAppInfo();
  const [disabled, setDisabled] = useState(false);

  async function handleIncrement(id: number) {
    setTransition(() => setProductsCountInCart(productCountInCart! + 1));

    if (typeof cartState[id] === 'undefined') {
      const updatedCartState = { ...cartState, [id]: 1 };
      setDisabled(true);
      setCartState(updatedCartState);
      await updateCart(updatedCartState);
      setDisabled(false);
    } else {
      const updatedCartState = { ...cartState, [id]: cartState[id] + 1 };
      setDisabled(true);
      setCartState(updatedCartState);
      await updateCart(updatedCartState);
      setDisabled(false);
    }
  }
  return { handleIncrement, disabled };
}
