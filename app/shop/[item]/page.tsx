import { getDictionary } from '../../../dictionaries';
import { cookies } from 'next/headers';
import { fetchCartItems, fetchItem } from '../../../api';
import Image from 'next/image';
import ItemPageAddToCartButton from '../../components/Shop/Item-Page/ItemPageAddToCartButton';
import Rating from '../../components/Shop/Rating';
import GoBackButton from '../../components/Shop/Item-Page/GoBackButton';
import ReviewSection from '../../components/Shop/Item-Page/ReviewSection';
import { getSession } from '@auth0/nextjs-auth0';
import ItemImageSLider from '../../components/Shop/Item-Page/ItemImageSlider';

export default async function page({ params }: { params: { item: string } }) {
  const lang = cookies().get('locale')?.value;
  const dict = await getDictionary(lang as string);
  const { itemWithReview, reviews }: { itemWithReview: ItemWithReviews; reviews: Review[] } =
    await fetchItem(Number(params.item));
  const cart = await fetchCartItems();
  const session = await getSession();
  const isLogged = !Object.is(session, null);
  const caliber = typeof itemWithReview.caliber === 'string' ? itemWithReview.caliber : 'N/A';
  const action = typeof itemWithReview.caliber === 'string' ? itemWithReview.action : 'N/A';

  return (
    <main>
      <section className="mx-auto w-80 sm:w-96 md:w-[560px] lg:w-4/5 lg:flex lg:gap-5 2xl:gap-10 py-7 sm:py-8 md:py-9 xl:py-10 2xl:py-12 xl:mb-5">
        <div className="shrink-0 lg:w-1/2 2xl:w-5/12 lg:flex lg:items-center relative  ">
          <div className="absolute top-0">
            <GoBackButton link="/shop" linkToDisplay="Shop" />
          </div>
          <ItemImageSLider
            images={[itemWithReview.thumbnail, itemWithReview.images[0], itemWithReview.images[1]]}
          />
        </div>
        <div className="py-4 px-2">
          <h1 className="font-bold text-2xl 2xl:text-3xl mb-1 xl:mb-2 2xl:mb-3">
            {itemWithReview.title}
          </h1>
          <Rating stars={itemWithReview.stars} reviews={itemWithReview.reviews} />
          <p className="mt-3 mb-4 2xl:mb-6 text-gray-600 2xl:text-lg dark:text-gray-400">
            {itemWithReview.description.text.slice(0, 300)}
          </p>

          <div className="grid grid-cols-2 gap-3 2xl:text-lg xl:max-w-[550px] xl:mx-auto 2xl:mb-4">
            <div className=" grid place-content-center p-8 rounded-md shadow-lg dark:outline dark:outline-orange-500/30 dark:outline-1">
              <p className="text-neutral-500 dark:text-neutral-300 text-center">Category</p>
              <p className="font-semibold text-center">{itemWithReview.category}</p>
            </div>
            <div className=" grid place-content-center p-8 rounded-md shadow-lg dark:outline dark:outline-gray-500/30 dark:outline-1 ">
              <p className="text-neutral-500 dark:text-neutral-300 text-center">Action</p>
              <p className="font-semibold text-center">{action}</p>
            </div>
            <div className=" grid place-content-center p-8 rounded-md shadow-lg dark:outline dark:outline-gray-500/30 dark:outline-1">
              <p className="text-neutral-500 dark:text-neutral-300 text-center">Caliber</p>
              <p className="font-semibold text-center">{caliber}</p>
            </div>
            <div className=" grid place-content-center p-8 rounded-md shadow-lg dark:outline dark:outline-orange-500/30 dark:outline-1">
              <p className="text-neutral-500 dark:text-neutral-300 text-center">Brand</p>
              <p className="font-semibold text-center">{itemWithReview.brand}</p>
            </div>
          </div>
          <p className="font-bold text-3xl mt-5 mb-4 xl:mb-6 2xl:mb-8 ">${itemWithReview.price}</p>

          <ItemPageAddToCartButton cart={cart} id={itemWithReview.id} isLogged={isLogged} />
        </div>
      </section>
      <ReviewSection itemWithReview={itemWithReview} reviews={reviews} />
    </main>
  );
}
