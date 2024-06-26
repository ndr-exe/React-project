'use client';
import React, { useState } from 'react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { updateReaction } from '../../../action';
import { isLoggedOut } from '@auth0/nextjs-auth0/dist/auth0-session';

type options = 'like' | 'dislike' | 'none';

export default function ReactToBlog({
  blogpost,
  isLogged,
}: {
  isLogged: boolean;
  blogpost: BlogpostHydrated;
}) {
  const [reactions, setReactions] = useState(() => ({
    likes: blogpost.likes,
    dislikes: blogpost.dislikes,
  }));
  const [isRated, setIsRated] = useState<options>(() => {
    if (typeof blogpost.userLiked === 'boolean') return blogpost.userLiked ? 'like' : 'dislike';
    return 'none';
  });

  async function handleReaction(reaction: 'like' | 'dislike') {
    const key = reaction === 'like' ? 'likes' : 'dislikes';
    // const incrementBy === reaction === 'like' ?

    if (isRated === reaction) {
      updateReaction('delete', blogpost.id);
      setIsRated('none');
      setReactions(p => {
        return { ...p, [key]: p[key] - 1 };
      });
    } else if (isRated === 'none') {
      // insert reactions into db
      updateReaction(reaction, blogpost.id);
      setIsRated(reaction);
      setReactions(p => {
        return { ...p, [key]: p[key] + 1 };
      });
    } else {
      //update reaction in db
      updateReaction(reaction, blogpost.id, true);
      setIsRated(reaction);
      setReactions(p => {
        return { dislikes: p.dislikes - 1, likes: p.likes - 1, [key]: p[key] + 1 };
      });
    }
  }

  return (
    <div className={``}>
      <div className="flex gap-2 dark:text-gray-100  text-gray-600 relative">
        {!isLogged && (
          <a href="/api/auth/login" className="absolute w-full h-ful top-0 left-0 opacity-0 z-50">
            Log in
          </a>
        )}

        <p className="flex text-sm items-center ">
          <span
            className={`w-3 h-6 flex items-center  ${
              isRated === 'like' ? 'opacity-100 text-blue-500' : 'opacity-40'
            }`}
          >
            {reactions.likes}
          </span>
          <button
            disabled={!isLogged}
            onClick={() => {
              handleReaction('like');
            }}
          >
            <AiOutlineLike
              className={`w-6 h-6 hover:text-blue-500 ${
                isRated === 'like' ? 'opacity-100 text-blue-500' : 'opacity-40'
              } `}
            />
          </button>
        </p>
        <p className={`flex text-sm items-center `}>
          <span
            className={`w-3 h-6 flex items-center  ${
              isRated === 'dislike' ? 'opacity-100 text-blue-500' : 'opacity-40'
            }`}
          >
            {reactions.dislikes}
          </span>
          <button
            disabled={!isLogged}
            onClick={() => {
              handleReaction('dislike');
            }}
          >
            <AiOutlineDislike
              className={`w-6 h-6 hover:text-blue-500  ${
                isRated === 'dislike' ? 'opacity-100 text-blue-500' : 'opacity-50'
              } `}
            />
          </button>
        </p>
      </div>
    </div>
  );
}
