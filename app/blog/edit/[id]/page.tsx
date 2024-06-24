import { cookies } from 'next/headers';

import Link from 'next/link';

import { getDictionary } from '../../../../dictionaries';
import EditBlogpost from '../../../components/Blog/EditBlogpost';
import { fetchBlog } from '../../../../api';
import { compareUserIDsToGrantPermission } from '../../../../userActions';

export default async function page({ params }: { params: { id: string } }) {
  const lang = cookies().get('locale')?.value;
  const dict = await getDictionary(lang as string);
  const blogPostHydrated: Awaited<BlogpostHydrated> = await fetchBlog(Number(params.id));
  compareUserIDsToGrantPermission(blogPostHydrated.author_id);

  return (
    <main className="max-w-screen-lg mx-auto">
      <h1 className="text-center">Edit a Blogpost</h1>
      <div className="mx-auto">
        <EditBlogpost blogPostHydrated={blogPostHydrated} />
      </div>
    </main>
  );
}
