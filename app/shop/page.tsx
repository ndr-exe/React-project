import { IoIosArrowUp } from 'react-icons/io';
import MobileFilters from '../components/Shop/MobileFilters';
import { fetchItems } from '../../api';
import ItemsGrid from '../components/Shop/ItemsGrid';
import Shop from '../components/Shop/Shop';

export default async function page() {
  const data: ItemWithReviews[] = await fetchItems();
  const items = [...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data];

  return (
    <main className="w-full min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-80px)]">
      <Shop items={items} />
    </main>
  );
}
