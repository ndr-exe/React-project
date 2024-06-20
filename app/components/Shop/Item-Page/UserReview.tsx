import CustomerReviewRating from './CustomerReviewRating';
import Image from 'next/image';

export default function userReview({ review }: { review: any }) {
  return (
    <>
      <div>
        <Image
          src={review.author_avatar}
          alt="user avatar"
          width={45}
          height={45}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <p className="font-medium lg:text-lg 2xl:text-xl">{review.author_username}</p>
        <div className="flex-1">
          <CustomerReviewRating stars={review.star} />
          <p className="text-gray-700 lg:text-lg 2xl:text-xl md:mt-1 lg:mt-2">
            {review.review!.text}
          </p>
        </div>
        <p className="font-light text-gray-600 text-sm lg:text-md">{review.created_at}</p>
      </div>
    </>
  );
}
