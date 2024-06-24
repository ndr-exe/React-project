import { getSession } from '@auth0/nextjs-auth0';
import { fetchCartItems, fetchItems } from '../../../api';
import GridWrapper from './GridWrapper';

export default async function ItemsGrid() {
  // const items: ItemWithReviews[] = await fetchItems();
  const cart = await fetchCartItems();
  const session = await getSession();
  const isLogged = !Object.is(session, null);
  const items: ItemWithReviews[] = await fetchItems();

  return (
    <div className="py-5">
      <GridWrapper cart={cart} items={items} isLogged={isLogged} />
      {/* <ul className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-2 gap-10 sm:gap-12 md:gap-x-0 lg:gap-y-20">
        {items.map((item: Item) => {
          return <Item key={item.id} item={item} cart={cart} />;
        })}
      </ul> */}
    </div>
  );
}
