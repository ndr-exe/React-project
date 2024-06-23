import { cookies } from 'next/headers';
import { getDictionary } from '../../../../dictionaries';
import { fetchItem } from '../../../../api';
import EditItem from '../../../components/dashboard/EditItem';
import Link from 'next/link';

export default async function page({ params }: { params: { item: string } }) {
  const lang = cookies().get('locale')?.value;
  const dict = await getDictionary(lang as string);
  const { itemWithReview, reviews }: { itemWithReview: ItemWithReviews; reviews: Review[] } =
    await fetchItem(Number(params.item));
  return (
    <main className="">
      <h1 className="text-center">Edit Item</h1>
      <Link href={'/'}>Go back</Link>
      <div className="mx-auto">
        <EditItem item={itemWithReview} />
      </div>
    </main>
  );
}
