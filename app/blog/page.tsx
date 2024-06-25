import React from 'react';
import { fetchBlogposts } from '../../api';
import Link from 'next/link';
import Image from 'next/image';
import { formatISODateToCustom } from '../../helperFunctions';
import { AiOutlineLike } from 'react-icons/ai';
import { AiOutlineDislike } from 'react-icons/ai';
import { returnUser } from '../../userActions';
import EditBlogpostButton from '../components/Blog/EditBlogpostButton';
import DeleteBlogpostButton from '../components/Blog/DeleteBlogpostButton';
import { BiEdit } from 'react-icons/bi';

import { getSession } from '@auth0/nextjs-auth0';
import { cookies } from 'next/headers';
import { getDictionary } from '../../dictionaries';

export const dynamic = 'force-dynamic';

export default async function page() {
  const { blogposts } = await fetchBlogposts();
  const lang = cookies().get('locale')?.value;
  const dict = await getDictionary(lang as string);
  const user = await returnUser();
  const session = await getSession();
  const isLogged = !Object.is(session, null);

  return (
    <main className="max-w-screen-lg mx-auto pb-5 ">
      <h1 className="text-3xl">Latest Posts</h1>
      {isLogged ? (
        <Link
          href="blog/add-new"
          className="flex items-center gap-1.5 rounded-md py-1 transition-colors bg-green-700 w-fit pl-1.5 pr-2 mb-3 mx-auto md:mx-0 md:ml-auto hover:text-white "
        >
          <BiEdit className="text-xl" />
          <span>Write a Post</span>
        </Link>
      ) : (
        <a
          href="api/auth/login"
          className="flex items-center gap-1.5 rounded-md py-1 transition-colors bg-green-700 w-fit pl-1.5 pr-2 mb-3 mx-auto md:mx-0 md:ml-auto hover:text-white "
        >
          <BiEdit className="text-xl" />
          <span>Write a Post</span>
        </a>
      )}

      <ul className="flex flex-col px-5 gap-10 w-full">
        {blogposts
          .sort((a: BlogpostHydrated, b: BlogpostHydrated) => b.id - a.id)
          .map((blogpost: BlogpostHydrated) => {
            return (
              <li key={blogpost.id} className="flex flex-col md:flex-row">
                <Link href={`blog/${blogpost.id}`} className="grow">
                  <div className="flex flex-col md:flex-row max-w-[350px] md:max-w-full mx-auto border-b md:border-b-0 md:gap-4 ">
                    <div className="relative w-full md:w-[33%] aspect-[16/9] md:shrink-0  rounded-md overflow-hidden  ">
                      <Image
                        src={blogpost.thumbnail}
                        alt={blogpost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col py-6 pb-3 grow gap-8 justify-between lg:py-4">
                      <div>
                        <p className="grow text-lg font-bold lg:w-4/5">{blogpost.title}</p>
                      </div>
                      <div className="flex  items-center justify-between  ">
                        <div className="flex items-center gap-3 ">
                          <div className="relative w-10 aspect-[1/1] rounded-full  overflow-hidden">
                            <Image
                              src={blogpost.author_avatar}
                              alt="Blogpost Author"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <p>{blogpost.author_username}</p>
                        </div>
                        <div className="flex gap-4 items-center">
                          <div className="flex gap-2 dark:text-gray-100  text-gray-600">
                            <p className="flex flex-col items-center text-sm">
                              {blogpost.likes}
                              <AiOutlineLike className="text-xl" />
                            </p>
                            <p className="flex flex-col items-center text-sm">
                              <AiOutlineDislike className="text-xl" />
                              {blogpost.dislikes}
                            </p>
                          </div>
                          <p className="text-gray-400 text-sm lg:text-base">
                            {formatISODateToCustom(blogpost.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                {blogpost.author_id === user && (
                  <div className="flex flex-row self-center w-28 justify-around md:flex-col shrink  h-2/3 gap-2 items-center py-1.5 rounded-lg bg-gray-400/70 text-white md:w-fit ">
                    <EditBlogpostButton link={`${blogpost.id}`} />
                    <DeleteBlogpostButton id={blogpost.id} />
                  </div>
                )}
              </li>
            );
          })}
      </ul>
    </main>
  );
}
