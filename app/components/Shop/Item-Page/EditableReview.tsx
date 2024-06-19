'use client';
import Image from 'next/image';
import CustomerReviewRating from './CustomerReviewRating';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import RateItem from './RateItem';
import { CgSpinnerAlt } from 'react-icons/cg';
import { updateReview } from '../../../../action';
export default function EditableReview({
  children,
  review,
}: {
  children: React.ReactNode;
  review: Review;
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeStars, setActiveStars] = useState(review.star);
  const [reviewText, setReviewText] = useState(review.review?.text);
  const [isLoading, setIsLoading] = useState(false);
  const [ratingIsMissing, setRatingIsMissing] = useState(false);
  const texareaRef = useRef<HTMLTextAreaElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  function handleRatingIsMissing() {
    setRatingIsMissing(false);
  }
  function handleRatingChange(rating: number) {
    setActiveStars(rating);
  }

  async function handleReviewSubmit() {
    if (texareaRef.current!.value.length < 3) {
      formRef.current!.reportValidity();
      return;
    }
    if (activeStars === 0) {
      setRatingIsMissing(true);
      return;
    }
    const updatedReview = {
      review: { text: reviewText },
      star: activeStars,
      id: review.id,
    };
    setIsLoading(true);
    await updateReview(updatedReview);
    router.refresh();
    setIsLoading(false);
    setIsEditMode(false);
  }
  return (
    <>
      {!isEditMode ? (
        children
      ) : (
        <form ref={formRef} action="" className="flex flex-col gap-3 w-fit ">
          <RateItem
            handleRatingChange={handleRatingChange}
            activeStars={activeStars}
            ratingIsMissing={ratingIsMissing}
            handleRatingIsMissing={handleRatingIsMissing}
          />
          <label htmlFor="reviewBox">Review</label>
          <textarea
            ref={texareaRef}
            cols={50}
            rows={10}
            minLength={3}
            maxLength={350}
            draggable="false"
            name="reviewBox"
            id="reviewBox"
            placeholder="Share yor thougts about the current item"
            className="block px-2 py-2 border border-[#627733] rounded-md w-full dark:bg-black"
            value={reviewText}
            required
            onChange={e => setReviewText(e.target.value)}
          />
          <button
            onClick={e => {
              e.preventDefault();
              handleReviewSubmit();
            }}
            disabled={
              isLoading || (review.review?.text === reviewText && activeStars === review.star)
            }
            className="border px-2 py-2 rounded-lg defaultBtn flex justify-center items-center min-h-11 disabled:opacity-75 disabled:pointer-events-none"
          >
            {isLoading ? (
              <span>
                <CgSpinnerAlt className="animate-spin" />
              </span>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </form>
      )}
      <button
        onClick={() => {
          setIsEditMode(p => !p);
          setActiveStars(review.star);
          setReviewText(review.review?.text);
        }}
        className="ml-2"
      >
        Edit
      </button>
    </>
  );
}
