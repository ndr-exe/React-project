import Image from 'next/image';

export default function ItemsGrid({ items }: { items: Item[] }) {
  return (
    <div className="py-5">
      <ul className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-2 gap-10 sm:gap-12 md:gap-x-0 lg:gap-y-20">
        {items.map((item: Item) => {
          return (
            <li
              key={item.id * Math.round(100 * Math.random())}
              className="rounded-xl  shadow-md w-[300px] sm:w-[350px] lg:w-[300px] 2xl:w-[350px] dark:outline outline-gray-500 group"
            >
              <div className="">
                <Image
                  src="https://placehold.co/300x200/png"
                  alt={item.title}
                  width={300}
                  height={200}
                  className="w-full group-hover:-translate-y-10 dark:group-hover:outline dark:outline-gray-500 rounded-t-xl transition-transform "
                />
              </div>
              <div className="pl-4 py-4 2xl:py-6">
                <p className="font-bold text-xl">{item.title}</p>
                <p className="text-gray-500">{item.action}</p>
                <p>{item.rating}</p>
                <p className="text-2xl font-bold mt-3 2xl:mt-6">
                  ${item.price}
                </p>
                <button className="mt-3 px-3 py-2 bg-black text-white rounded-md font-bold text-xl 2xl:mt-5 ">
                  Add to Cart
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
