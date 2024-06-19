import { FaStar } from 'react-icons/fa';

export default function CustomerReviewRating({ stars }: { stars: number }) {
  const starIconsInitial = [
    <FaStar key={101} className="fill-gray-500/50 " />,
    <FaStar key={102} className="fill-gray-500/50 " />,
    <FaStar key={103} className="fill-gray-500/50 " />,
    <FaStar key={104} className="fill-gray-500/50 " />,
    <FaStar key={105} className="fill-gray-500/50 " />,
  ];
  return (
    <div className="flex">
      {starIconsInitial.map((star, idx) => {
        const modifiedStar = stars > idx ? <FaStar key={4} className="fill-yellow-500" /> : star;
        return modifiedStar;
      })}
    </div>
  );
}
