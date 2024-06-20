import { fetchCartItemsWithInfo } from '../../api';
import CartList from '../components/Shop/Cart/CartList';

export default async function page() {
  const { items, itemsRaw } = await fetchCartItemsWithInfo();
  return <CartList items={items} itemsRaw={itemsRaw} />;
}
