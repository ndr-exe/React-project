import { getSession } from '@auth0/nextjs-auth0';
import Image from 'next/image';
import WriteBox from '../../WriteBox';
import CustomerReviewRating from './CustomerReviewRating';
import EditableReview from './EditableReview';
import UserReview from './UserReview';
import { Suspense } from 'react';
import { fetchItem } from '../../../../api';
import { GoPencil } from 'react-icons/go';

export default async function ReviewSection({
  itemWithReview,
  reviews,
}: {
  itemWithReview: ItemWithReviews;
  reviews: Review[];
}) {
  const session = await getSession();
  const isLogged = !Object.is(session, null);
  const userHasReviewedTheItem =
    session &&
    session.user &&
    reviews.findIndex((review: Review) => session.user.sub === review.author_id) !== -1
      ? true
      : false;
  return (
    <section className="px-3 sm:px-5 md:px-7 max-w-screen-2xl mx-auto ">
      <h2 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold mb-5 md:mb-7 lg:mb-5 xl:mb-12">
        Customer Reviews
      </h2>
      {!isLogged && (
        <a
          href="/api/auth/login"
          className="defaultBtn px-3 py-1 rounded-md mb-2 w-fit flex items-center gap-1"
        >
          <GoPencil />
          Write a review
        </a>
      )}
      {isLogged && !userHasReviewedTheItem && (
        <WriteBox
          user={session?.user.sub}
          itemID={itemWithReview.id}
          // reviews={reviews}
        />
      )}
      <ul className="flex flex-col gap-3">
        {reviews
          .sort((a: Review, b: Review) => b.id - a.id)
          .map((review: Review) => {
            if (review.author_id === session?.user.sub) {
              return <EditableReview key={review.id} review={review} />;
            }
            return (
              <li
                key={review.id}
                className="flex gap-5 border-b pb-3 last:border-b-0 first:border-t first:pt-3"
              >
                <UserReview review={review} />
              </li>
            );
          })}
      </ul>
    </section>
  );
}
