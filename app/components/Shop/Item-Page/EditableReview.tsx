'use client';
import Image from 'next/image';
import { Suspense, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import RateItem from './RateItem';
import { CgSpinnerAlt } from 'react-icons/cg';
import { deleteReview, updateReview } from '../../../../action';
import { FiTrash2 } from 'react-icons/fi';
import { CiEdit } from 'react-icons/ci';
import { ImUndo } from 'react-icons/im';
import { GrEdit } from 'react-icons/gr';
import UserReview from './UserReview';

export default function EditableReview({ review }: { review: Review }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeStars, setActiveStars] = useState(review.star);
  const [reviewText, setReviewText] = useState(review.review?.text);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingOnDelete, setLoadingOnDelete] = useState(false);
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

  async function handleDeleteReview(id: number) {
    setLoadingOnDelete(true);
    await deleteReview(id);
    setIsEditMode(false);
    setLoadingOnDelete(false);
  }

  return (
    <li className="flex gap-1 sm:gap-5 border-b pb-3 last:border-b-0 first:border-t first:pt-3 flex-wrap">
      {!isEditMode ? (
        <UserReview review={review} />
      ) : (
        <form ref={formRef} action="" className="flex flex-col gap-3 flex-grow ">
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
            className="border px-6 py-1 w-fit self-center rounded-lg defaultBtn flex justify-center items-center min-h-11 disabled:opacity-75 disabled:pointer-events-none"
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
      <div className="self-center flex sm:flex-col gap-7 w-full pt-3 justify-center sm:w-max sm:pt-0 ">
        <button
          onClick={() => {
            setIsEditMode(p => !p);
            setActiveStars(review.star);
            setReviewText(review.review?.text);
          }}
          className="flex items-center gap-0.5"
        >
          {isEditMode ? <ImUndo className="text-xl" /> : <GrEdit className="text-xl" />}
        </button>
        <button
          disabled={loadingOnDelete}
          onClick={() => {
            handleDeleteReview(review.id);
          }}
          className="flex items-center gap-0.5"
        >
          {loadingOnDelete ? (
            <span>
              <CgSpinnerAlt className="animate-spin text-lg" />
            </span>
          ) : (
            <FiTrash2 className="text-2xl" />
          )}
        </button>
      </div>
    </li>
  );
}
