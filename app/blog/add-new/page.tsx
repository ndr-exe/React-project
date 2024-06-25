import { cookies } from 'next/headers';

import Link from 'next/link';

import AddBlogpost from '../../components/Blog/AddBlogpost';
import { getDictionary } from '../../../dictionaries';
import GoBackButton from '../../components/Shop/Item-Page/GoBackButton';

export default async function page() {
  const lang = cookies().get('locale')?.value;
  const dict = await getDictionary(lang as string);
  return (
    <main className="max-w-screen-lg mx-auto">
      <GoBackButton link="/blog" linkToDisplay="blog" />

      <h1 className="text-center">Write Blogpost</h1>
      <div className="mx-auto">
        <AddBlogpost />
      </div>
    </main>
  );
}
