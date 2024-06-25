'use client';
import ItemsGrid from './ItemsGrid';
import FullFilters from './FullFilters';
import MobileFilters from './MobileFilters';
import { useState } from 'react';
import SearchItems from './Item-Page/SearchItems';

const categories = ['handgun', 'shotgun', 'rifle', 'sniper rifle', 'ammo', 'accessories'];

export default function GridWrapper({
  cart,
  items,
  isLogged,
}: {
  cart: any;
  items: ItemWithReviews[];
  isLogged: boolean;
}) {
  const [itemsState, setItemsState] = useState(() => items);
  const [activeFilter, setActiveFilter] = useState(null);

  function handleSearch(query: string) {
    if (query === 'empty') return setItemsState(items);
    setItemsState(p => {
      const matchedProducts = [...p].filter(item => {
        return item.title.split(' ').join('').toLocaleLowerCase().includes(query);
      });
      return matchedProducts;
    });
  }

  function applyFilter(filterID: number) {
    if (filterID === activeFilter) {
      setActiveFilter(null);
      setItemsState(items);
    } else {
      const stateClone = [...items].filter(i => {
        return i.category.toLowerCase() === categories[filterID];
      });
      setActiveFilter(filterID);
      setItemsState(stateClone);
    }
  }

  return (
    <div className="py-3">
      <div className="w-fit mx-auto">
        <SearchItems handleSearch={handleSearch} />
      </div>
      <div className="py-4 px-4 xl:hidden">
        <MobileFilters />
      </div>
      <div className="xl:flex">
        <div className="hidden xl:block">
          <FullFilters applyFilter={applyFilter} activeFilter={activeFilter} />
        </div>
        <div className="flex-1">
          <div className="py-5">
            <ItemsGrid cart={cart} items={itemsState} isLogged={isLogged} />
          </div>
        </div>
      </div>
    </div>
  );
}
