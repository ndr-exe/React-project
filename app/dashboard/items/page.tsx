import Link from 'next/link';
import { fetchItems } from '../../../api';
import Image from 'next/image';
import DeleteItem from '../../components/dashboard/DeleteItem';
import { CiEdit } from 'react-icons/ci';

import { LuExternalLink } from 'react-icons/lu';

export const dynamic = 'force-dynamic';

export default async function page() {
  const items: Awaited<ItemWithReviews[]> = await fetchItems();

  return (
    <main>
      <h1 className="text-center text-2xl font-semibold mb-5">Items in shop</h1>
      <Link
        href={'items/add-item'}
        className="mx-auto w-fit block px-3 py-1 rounded-md mb-5 bg-indigo-800 text-white"
      >
        Add a new item
      </Link>
      <table className="w-5/6 mx-auto ">
        <thead className="text-left border-b">
          <tr className="pb-3">
            <th>Thumb.</th>
            <th className="px-3">ID</th>
            <th>Title</th>
            <th>Price</th>
            <th className="text-center">Shop Link</th>
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
                  <Link href={`/shop/${item.id}`} className="flex justify-center items-center">
                    <LuExternalLink className="text-xl" />
                  </Link>
                </td>
                <td>
                  <Link href={`items/${item.id}`}>
                    <CiEdit className="text-2xl" />
                  </Link>
                </td>
                <td>
                  <DeleteItem id={item.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
