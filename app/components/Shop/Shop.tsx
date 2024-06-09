import FullFilters from './FullFilters';
import ItemsGrid from './ItemsGrid';
import MobileFilters from './MobileFilters';

export default function Shop({ items }: { items: Item[] }) {
  return (
    <div>
      <div className="py-4 px-4 xl:hidden">
        <MobileFilters />
      </div>
      <div className="xl:flex">
        <div className="hidden xl:block">
          <FullFilters />
        </div>
        <div className="flex-1">
          <ItemsGrid items={items} />
        </div>
      </div>
    </div>
  );
}
