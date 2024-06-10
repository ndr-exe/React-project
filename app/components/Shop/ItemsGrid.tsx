import { fetchCartItems } from '../../../api';
import GridWrapper from './GridWrapper';
import Item from './Item';

export default async function ItemsGrid({ items }: { items: Item[] }) {
  const cart = await fetchCartItems();

  return (
    <div className="py-5">
      <GridWrapper cart={cart} items={items} />
      {/* <ul className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-2 gap-10 sm:gap-12 md:gap-x-0 lg:gap-y-20">
        {items.map((item: Item) => {
          return <Item key={item.id} item={item} cart={cart} />;
        })}
      </ul> */}
    </div>
  );
}
