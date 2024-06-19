'use client';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function RateItem({
  handleRatingChange,
  activeStars,
  ratingIsMissing,
  handleRatingIsMissing,
}: {
  handleRatingChange: (rating: number) => void;
  activeStars: number;
  ratingIsMissing: Boolean;
  handleRatingIsMissing: () => void;
}) {
  const [lockIn, setLockIn] = useState(false);
  return (
    <div>
      <p className="mb-1">Rating</p>
      <div
        onMouseEnter={() => {
          ratingIsMissing && handleRatingIsMissing();
          handleRatingChange(0);
          setLockIn(false);
        }}
        onMouseLeave={() => lockIn || handleRatingChange(0)}
        className="flex items-center w-fit min-h-5 text-lg gap-0.5"
      >
        <FaStar
          onMouseOver={() => handleRatingChange(1)}
          onClick={() => setLockIn(p => !p)}
          className={`fill-gray-500/50 ${activeStars > 0 && '!fill-yellow-500'} `}
        />
        <FaStar
          onMouseOver={() => handleRatingChange(2)}
          onClick={() => setLockIn(p => !p)}
          className={`fill-gray-500/50 ${activeStars > 1 && '!fill-yellow-500'} `}
        />
        <FaStar
          onMouseOver={() => handleRatingChange(3)}
          onClick={() => setLockIn(p => !p)}
          className={`fill-gray-500/50 ${activeStars > 2 && '!fill-yellow-500'} `}
        />
        <FaStar
          onMouseOver={() => handleRatingChange(4)}
          onClick={() => setLockIn(p => !p)}
          className={`fill-gray-500/50 ${activeStars > 3 && '!fill-yellow-500'} `}
        />
        <FaStar
          onMouseOver={() => handleRatingChange(5)}
          onClick={() => setLockIn(p => !p)}
          className={`fill-gray-500/50 ${activeStars > 4 && '!fill-yellow-500'} `}
        />
        {ratingIsMissing && <p className="ml-2 text-sm text-[#C34A36]">Please Rate the item </p>}
      </div>
    </div>
  );
}
