'use client';
import { FaStar } from 'react-icons/fa';

const starIconsInitial = [
  <FaStar key={101} className="fill-gray-500/50 " />,
  <FaStar key={102} className="fill-gray-500/50 " />,
  <FaStar key={103} className="fill-gray-500/50 " />,
  <FaStar key={104} className="fill-gray-500/50 " />,
  <FaStar key={105} className="fill-gray-500/50 " />,
];

export default function CustomerReviewRating({ stars }: { stars: number }) {
  return (
    <div className="flex">
      {starIconsInitial.map((star, idx) => {
        const modifiedStar = stars > idx ? <FaStar key={idx} className="fill-yellow-500" /> : star;
        return modifiedStar;
      })}
    </div>
  );
}
