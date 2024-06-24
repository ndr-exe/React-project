import React from 'react';
import { fetchBlogposts } from '../../api';
import Link from 'next/link';
import Image from 'next/image';
import { formatISODateToCustom, formatShortDate } from '../../helperFunctions';
import { AiOutlineLike } from 'react-icons/ai';
import { AiOutlineDislike } from 'react-icons/ai';
export const dynamic = 'force-dynamic';

export default async function page() {
  const { blogposts } = await fetchBlogposts();
  // console.log(blogposts);

  return (
    <main className="max-w-screen-lg mx-auto ">
      <h1>Latest Posts</h1>
      <ul className="flex flex-col px-5 gap-10 w-full">
        {blogposts.map((blogpost: BlogpostHydrated) => {
          return (
            <li key={blogpost.id}>
              <Link href={`blog/${blogpost.id}`}>
                <div className="flex flex-col md:flex-row max-w-[350px] md:max-w-full mx-auto border-b md:border-b-0 md:gap-4">
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
            </li>
          );
        })}
      </ul>
    </main>
  );
}
