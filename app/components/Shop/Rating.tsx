import React from 'react';
import { FaStar } from 'react-icons/fa';

export default function Rating({ stars, reviews }: { stars: number; reviews: number }) {
  const rating = Math.round(stars / reviews);
  const starIconsInitial = [
    <FaStar key={0} className="fill-gray-500/50 " />,
    <FaStar key={1} className="fill-gray-500/50 " />,
    <FaStar key={2} className="fill-gray-500/50 " />,
    <FaStar key={3} className="fill-gray-500/50 " />,
    <FaStar key={4} className="fill-gray-500/50 " />,
  ];

  for (let idx = 0; idx < rating; idx++) {
    starIconsInitial[idx] = <FaStar key={idx} className="fill-yellow-500 " />;
  }
  return (
    <div className="flex items-center gap-1">
      <span className="flex">{starIconsInitial}</span>
      <span>{reviews > 0 ? `(${reviews} reviews)` : `(no reviews yet)`}</span>
    </div>
  );
}
