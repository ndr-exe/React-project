import { getSession } from '@auth0/nextjs-auth0';
import { fetchCartItems, fetchItems } from '../../api';
import GridWrapper from '../components/Shop/GridWrapper';

export default async function page() {
  const cart = await fetchCartItems();
  const session = await getSession();
  const isLogged = !Object.is(session, null);
  const items: ItemWithReviews[] = await fetchItems();
  return (
    <main className="w-full min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-80px)]">
      <GridWrapper cart={cart} isLogged={isLogged} items={items} />
    </main>
  );
}
