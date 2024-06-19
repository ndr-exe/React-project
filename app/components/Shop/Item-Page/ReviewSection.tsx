import { getSession } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import WriteBox from '../../WriteBox';
import CustomerReviewRating from './CustomerReviewRating';
import EditableReview from './EditableReview';

export default async function ReviewSection({
  itemWithReview,
  reviews,
}: {
  itemWithReview: ItemWithReviews;
  reviews: Review[];
}) {
  const session = await getSession();
  const userHasReviewedTheItem =
    session?.user &&
    reviews.findIndex((review: Review) => session.user.sub === review.author_id) !== -1;
  const applyFilters = userHasReviewedTheItem
    ? reviews.filter((review: Review) => review.author_id !== session?.user.sub)
    : reviews;
  console.log(applyFilters);

  const idxa = reviews.findIndex((review: Review) => session?.user.sub === review.author_id);
  return (
    <section className="px-5 sm:px-6 md:px-7 max-w-screen-2xl mx-auto ">
      <h2 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold mb-5 md:mb-7 lg:mb-5 xl:mb-12">
        Customer Reviews
      </h2>
      {!userHasReviewedTheItem && <WriteBox user={session!.user} itemID={itemWithReview.id} />}
      <ul className="flex flex-col gap-3">
        {userHasReviewedTheItem && (
          <li
            key={'unique'}
            className="flex gap-5 border-b pb-3 last:border-b-0 first:border-t first:pt-3"
          >
            <EditableReview review={reviews[idxa]}>
              <div className="">
                <Image
                  src={reviews[idxa].author_avatar}
                  alt="user avatar"
                  width={45}
                  height={45}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium lg:text-lg 2xl:text-xl">
                  {reviews[idxa].author_username}
                </p>
                <div className="flex-1">
                  <CustomerReviewRating stars={reviews[idxa].star} />
                  <p className="text-gray-700 lg:text-lg 2xl:text-xl md:mt-1 lg:mt-2">
                    {reviews[idxa].review!.text}
                  </p>
                </div>
                <p className="font-light text-gray-600 text-sm lg:text-md">01/05/2023</p>
              </div>
            </EditableReview>
          </li>
        )}
        {applyFilters

          .sort((a: Review, b: Review) => b.id - a.id)
          .map((review: Review, idx: number) => {
            return (
              <li
                key={review.id}
                className="flex gap-5 border-b pb-3 last:border-b-0 first:border-t first:pt-3"
              >
                <div>
                  <Image
                    src={review.author_avatar}
                    alt="user avatar"
                    width={45}
                    height={45}
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-medium lg:text-lg 2xl:text-xl">{review.author_username}</p>
                  <div className="flex-1">
                    <CustomerReviewRating stars={review.star} />
                    <p className="text-gray-700 lg:text-lg 2xl:text-xl md:mt-1 lg:mt-2">
                      {review.review!.text}
                    </p>
                  </div>
                  <p className="font-light text-gray-600 text-sm lg:text-md">01/05/2023</p>
                </div>
              </li>
            );
          })}
      </ul>
    </section>
  );
}
