import { getDictionary } from '../../../dictionaries';
import { cookies } from 'next/headers';
import { fetchCartItems, fetchItem } from '../../../api';
import Image from 'next/image';
import ItemPageAddToCartButton from '../../components/Shop/Item-Page/ItemPageAddToCartButton';

export default async function page({ params }: { params: { item: string } }) {
  const lang = cookies().get('locale')?.value;
  const dict = await getDictionary(lang as string);
  const item: Item = await fetchItem(Number(params.item));
  const cart = await fetchCartItems();

  console.log(item);

  return (
    <main>
      <section className="mx-auto w-[300px]">
        <div>
          <Image
            src="https://placehold.co/300x200/png"
            alt={item.title}
            width={300}
            height={200}
            className="w-full group-hover:-translate-y-10 dark:group-hover:outline dark:outline-gray-500 rounded-t-xl transition-transform "
          />
        </div>
        <div className="py-4">
          <h1 className="font-bold text-2xl">{item.title}</h1>
          <div>{item.rating}star</div>
          <p className="mt-3 mb-4 text-gray-600">{item.description.slice(0, 250)}</p>

          <div className="grid grid-cols-2 gap-3">
            <div className=" grid place-content-center p-8 rounded-md shadow-lg ">
              <p>Brand</p>
              <p>{item.brand}</p>
            </div>
            <div className=" grid place-content-center p-8 rounded-md shadow-lg ">
              <p>Category</p>
              <p>{item.category}</p>
            </div>
            <div className=" grid place-content-center p-8 rounded-md shadow-lg ">
              <p>Action</p>
              <p>{item.action}</p>
            </div>
            <div className=" grid place-content-center p-8 rounded-md shadow-lg ">
              <p>Caliber</p>
              <p>{item.caliber}</p>
            </div>
          </div>
          <p className="font-bold text-3xl mt-5 mb-4 ">${item.price}</p>

          <ItemPageAddToCartButton cart={cart} id={item.id} />
        </div>
      </section>
    </main>
  );
}
