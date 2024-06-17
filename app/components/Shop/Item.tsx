import Image from 'next/image';
import AddToCartButton from './AddToCartButton';
import { fetchCartItems } from '../../../api';
import useOptimisticAddToCartButton from '../../hooks/useOptimisticAddToCartButton';
import Rating from './Rating';

export default function Item({
  item,
  cart,
  handleIncrement,
}: {
  item: ItemWithReviews;
  cart: any;
  handleIncrement: any;
}) {
  return (
    <li className="rounded-xl  shadow-md w-[300px] sm:w-[350px] lg:w-[280px] 2xl:w-4/5 dark:outline outline-gray-500 group">
      <div className="">
        <Image
          src="https://placehold.co/300x200/png"
          alt={item.title}
          width={300}
          height={200}
          className="w-full group-hover:-translate-y-10 dark:group-hover:outline dark:outline-gray-500 rounded-t-xl transition-transform "
        />
      </div>
      <div className="pl-4 py-4 2xl:py-6">
        <p className="font-bold text-xl">{item.title}</p>
        <p className="text-gray-500 mb-1">{item.action}</p>
        <Rating stars={item.stars} reviews={item.reviews} />
        <p className="text-2xl font-bold mt-3 2xl:mt-6">${item.price}</p>
        <AddToCartButton id={item.id} cart={cart} handleIncrement={handleIncrement} />
      </div>
    </li>
  );
}
