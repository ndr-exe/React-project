import { fetchCartItemsWithInfo } from '../../api';
import CartList from '../components/Shop/Cart/CartList';

export default async function page() {
  const { items, itemsRaw } = await fetchCartItemsWithInfo();
  console.log(items);
  return <CartList items={items} itemsRaw={itemsRaw} />;
}
