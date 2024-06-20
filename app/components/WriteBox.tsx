'use client';
import { useRef, useState } from 'react';
import { GoPencil } from 'react-icons/go';
import RateItem from './Shop/Item-Page/RateItem';
import { fetchAuth0UserData } from '../../userActions';
import { submitReview } from '../../action';
import { IoCloseOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { CgSpinnerAlt } from 'react-icons/cg';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function WriteBox({ user, itemID }: { user: string; itemID: number }) {
  const [showFilters, setShowFilters] = useState(false);
  const [closeFilters, setCLoseFilters] = useState(false);
  const [activeStars, setActiveStars] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [ratingIsMissing, setRatingIsMissing] = useState(false);
  const texareaRef = useRef<HTMLTextAreaElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

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
    const reviewWithRating = {
      review: { text: reviewText },
      star: activeStars,
      author_id: user,
      product_id: itemID,
    };
    setIsLoading(true);
    await submitReview(reviewWithRating);
    setIsLoading(false);
    router.refresh();
    setShowFilters(false);
  }

  return (
    <div className="" ref={divRef}>
      <div className="w-full mx-auto items-center  text-md">
        <button
          ref={buttonRef}
          onClick={
            showFilters
              ? () => {
                  setCLoseFilters(p => !p);
                  buttonRef.current?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.scrollIntoView(
                    { behavior: 'smooth' }
                  );
                  // buttonRef.current?.scrollIntoView({ behavior: 'smooth' });
                }
              : () => {
                  setShowFilters(p => !p);
                }
          }
          className={` h-full flex justify-center items-center rounded-md min-w-40 pl-2 pr-3 py-1 mr-auto mb-5 ${
            showFilters ? 'abortBtn' : 'defaultBtn'
          } `}
        >
          {showFilters ? (
            <>
              <span className="text-xl">
                <IoCloseOutline />
              </span>
              <span>Stop Writing</span>
            </>
          ) : (
            <>
              {' '}
              <span className="text-xl mr-1">
                <GoPencil />
              </span>
              <span>Write a Review</span>
            </>
          )}
        </button>
      </div>
      {showFilters && (
        <div className={`overflow-hidden `}>
          <div
            onAnimationStart={() =>
              showFilters && formRef.current!.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            onAnimationEnd={() => closeFilters && (setShowFilters(false), setCLoseFilters(false))}
            className={`pt-1 pb-6 px-4 applyFilterAnimation ${
              closeFilters && 'applyFilterAnimationClose'
            }`}
          >
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
                disabled={isLoading}
                className="border px-2 py-2 rounded-lg defaultBtn flex justify-center items-center min-h-11"
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
          </div>
        </div>
      )}
    </div>
  );
}
