'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useOptimistic,
  useState,
} from 'react';
import { calculateProductsCountInCart } from '../../../helperFunctions';

type AppInfo = {
  productCountInCart?: number;
  // setProductsCountInCart: Dispatch<SetStateAction<number>>;
  setProductsCountInCart?: any;
};

type AppContextProps = {
  children: React.ReactNode;
  cartItems: CartProducts;
};

// const AppContext = createContext<AppInfo | null>(null);
const AppContext = createContext<AppInfo>({});

export default function AppProvider({ children, cartItems }: AppContextProps) {
  // const [productCountInCart, setProductsCountInCart] = useState(() =>
  //   calculateProductsCountInCart(cartItems)
  // );

  const [productCountInCart, setProductsCountInCart] = useOptimistic(
    calculateProductsCountInCart(cartItems),
    // updateFn
    (currentState: number, optimisticValue: number) => {
      // merge and return new state
      // with optimistic value
      return optimisticValue;
    }
  );

  return (
    <AppContext.Provider value={{ productCountInCart, setProductsCountInCart }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppInfo() {
  return useContext(AppContext);
}
