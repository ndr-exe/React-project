import Link from 'next/link';
import { fetchItems } from '../../../api';
import Image from 'next/image';

export default async function page() {
  const items: Awaited<ItemWithReviews[]> = await fetchItems();

  return (
    <main>
      <h1 className="text-center text-lg mb-5">Items in shop</h1>
      <button>Add a new item</button>
      <table className="w-5/6 mx-auto ">
        <thead className="text-left border-b">
          <tr className="pb-3">
            <th>Thumb.</th>
            <th className="px-3">ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
            <th>Edit</th>
            <th>Del.</th>
          </tr>
        </thead>
        <tbody className="text-left">
          {items.map(item => {
            return (
              <tr key={item.id} className="h-20">
                <td>
                  <Image src={item.thumbnail} alt={item.title} width={45} height={45} />
                </td>
                <td className="px-3">{item.id}</td>
                <td className="text-sm">{item.title}</td>
                <td>{item.price}</td>
                <td className="">
                  <Link href={`/shop/${item.id}`} className="">
                    Link
                  </Link>
                </td>
                <td>
                  <Link href={`/items/${item.id}`}>edit</Link>
                </td>
                <td>Del.</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
