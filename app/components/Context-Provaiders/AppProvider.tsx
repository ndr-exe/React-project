'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { calculateProductsCountInCart } from '../../../helperFunctions';

type AppInfo = {
  productCountInCart: number;
  setProductsCountInCart: Dispatch<SetStateAction<number>>;
};

type AppContextProps = {
  children: React.ReactNode;
  cartItems: CartProducts;
};

const AppContext = createContext<AppInfo | null>(null);

export default function AppProvider({ children, cartItems }: AppContextProps) {
  const [productCountInCart, setProductsCountInCart] = useState(() =>
    calculateProductsCountInCart(cartItems)
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
