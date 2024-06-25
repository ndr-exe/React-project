import { getDictionary } from '../../../dictionaries';
import { cookies } from 'next/headers';
import { fetchBlog, fetchCartItems, fetchItem } from '../../../api';
import Image from 'next/image';
import { getSession } from '@auth0/nextjs-auth0';
import { formatISODateToCustom } from '../../../helperFunctions';
import ReactToBlog from '../../components/Blog/ReactToBlog';
import GoBackButton from '../../components/Shop/Item-Page/GoBackButton';
export const dynamic = 'force-dynamic';

export default async function page({ params }: { params: { id: string } }) {
  const lang = cookies().get('locale')?.value;
  const dict = await getDictionary(lang as string);
  const session = await getSession();
  const isLogged = !Object.is(session, null);
  const blogpost = (await fetchBlog(Number(params.id))) as BlogpostHydrated;

  return (
    <main className="max-w-screen-lg mx-auto px-2 sm:px-8 md:px-9 lg:px-10 xl:px-0">
      <div className="mb-3">
        <GoBackButton link="/blog" linkToDisplay="Blog" />
      </div>

      <div className="relative w-full aspect-[3/1]">
        <Image src={blogpost.thumbnail} alt={blogpost.title} fill />
      </div>
      <div className="px-3 py-4 flex flex-col gap-3">
        <h1 className="text-lg font-semibold">{blogpost.title}</h1>
        <p>{blogpost.blogpost.text}</p>
        <div className="flex mt-3 justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative w-10 aspect-[1/1] rounded-full  overflow-hidden">
              <Image
                src={blogpost.author_avatar}
                alt="Blogpost Author"
                fill
                className="object-contain"
              />
            </div>
            <p className="font-semibold tracking-wide">{blogpost.author_username}</p>
          </div>
          <div>
            <ReactToBlog blogpost={blogpost} isLogged={isLogged} />
          </div>
        </div>
        <p className="self-end text-sm text-gray-500">
          Posted on:{formatISODateToCustom(blogpost.created_at)}{' '}
        </p>
      </div>
    </main>
  );
}
