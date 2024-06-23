import { cookies } from 'next/headers';

import Link from 'next/link';

import AddBlogpost from '../../components/Blog/AddBlogpost';
import { getDictionary } from '../../../dictionaries';

export default async function page() {
  const lang = cookies().get('locale')?.value;
  const dict = await getDictionary(lang as string);
  return (
    <main className="max-w-screen-lg mx-auto">
      <Link href={'/'}>Go back</Link>
      <h1 className="text-center">Write a Blogpost</h1>
      <div className="mx-auto">
        <AddBlogpost />
      </div>
    </main>
  );
}
