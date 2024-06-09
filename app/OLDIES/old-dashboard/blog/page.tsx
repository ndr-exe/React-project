import { Suspense } from 'react';
import Blogs from '../../../old-components/Blogs/Blogs';
import BlogsLoader from '../../../old-components/Blogs/BlogsLoader';
import { getDictionary } from '../../dictionaries';
import { cookies } from 'next/headers';

export default async function page() {
  const lang = cookies().get('locale')?.value;
  const dict = await getDictionary(lang as string);

  return (
    <Suspense fallback={<BlogsLoader />}>
      <Blogs dict={dict} />
    </Suspense>
  );
}
