import { cookies } from 'next/headers';
import { getDictionary } from '../../../../dictionaries';
import Link from 'next/link';
import AddItem from '../../../components/dashboard/AddItem';

export default async function page() {
  const lang = cookies().get('locale')?.value;
  const dict = await getDictionary(lang as string);
  return (
    <main className="">
      <Link href={'/'}>Go back</Link>
      <h1 className="text-center">Add Item</h1>
      <div className="mx-auto">
        <AddItem />
      </div>
    </main>
  );
}
