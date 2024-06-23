'use client';

import { useRef, useState } from 'react';
import { updateBlog, updateItems } from '../../../action';
import { usePathname, useRouter } from 'next/navigation';
import { PutBlobResult } from '@vercel/blob';
import { ImUndo } from 'react-icons/im';
import { GrEdit } from 'react-icons/gr';
import { CgSpinnerAlt } from 'react-icons/cg';
import BlogImageSelector from './BlogImageSelector';

type newImg = {
  [key: string]: File;
};

export default function EditBlogpost({ blogPostHydrated }: { blogPostHydrated: BlogpostHydrated }) {
  const [blogpostState, setBlogpostState] = useState(() => blogPostHydrated);
  const [isEditing, setisEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [newImages, setNewImages] = useState<newImg>({});
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  async function handleUpdate() {
    if (!formRef.current?.reportValidity()) return;
    if (Object.values(newImages).length < 1) {
      //   setError(true);
      //   setTimeout(() => setError(false), 2500);
      setIsLoading(true);
      await updateBlog(blogpostState, 'UPDATE');
      setIsLoading(false);
      setisEditing(false);
      router.refresh();

      return;
    }
    setIsLoading(true);
    const blogpostStateClone = { ...blogpostState };
    for (const ImgType in newImages) {
      const response = await fetch(`/api/upload-avatar?filename=${newImages[ImgType].name}`, {
        method: 'POST',
        body: newImages[ImgType],
      });

      const newBlob = (await response.json()) as PutBlobResult;
      if (ImgType === 'thumbnail') {
        blogpostStateClone.thumbnail = newBlob.url;
      }

      await updateBlog(blogpostStateClone, 'UPDATE');
      setIsLoading(false);
      setisEditing(false);
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col items-center pt-5 pb-8">
      <div
        className={`flex gap-5 items-start self-center px-10 mt-5 mb-8 w-4/5 relative ml-[8%] ${
          !isEditing && 'pointer-events-none'
        }`}
      >
        <div className=" w-full max-h-[550px]">
          <BlogImageSelector
            currentImg={blogpostState.thumbnail}
            setImg={setNewImages}
            type="thumbnail"
          />
        </div>
        {error && (
          <p className="absolute text-red-500 -bottom-8 text-center w-fit left-1/2 -translate-x-1/2">
            Thumbnail image is required
          </p>
        )}
      </div>
      <form
        ref={formRef}
        action=""
        onSubmit={e => e.preventDefault()}
        className="w-full px-10 py-5 mx-auto flex flex-col gap-3"
      >
        {/* TITLE */}
        <div className="flex gap-2">
          <label htmlFor="title" className="basis-[8%]">
            Title
          </label>
          <input
            required
            minLength={2}
            maxLength={155}
            type="text"
            name="title"
            id="title"
            value={blogpostState.title}
            disabled={!isEditing}
            className="px-1.5 py-1.5 rounded-md border dark:bg-gray-800 w-2/5"
            onChange={e => {
              if (!isEditing) return;
              setBlogpostState(p => {
                return { ...p, title: e.target.value };
              });
            }}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="flex gap-2">
          <label htmlFor="description" className="basis-[8%]">
            Text
          </label>
          <textarea
            required
            minLength={255}
            maxLength={1200}
            name="description"
            id="description"
            value={blogpostState.blogpost.text}
            disabled={!isEditing}
            className="min-h-72 grow resize-none px-2 py-2 border rounded-lg dark:bg-gray-800"
            onChange={e => {
              if (!isEditing) return;
              setBlogpostState(p => {
                return { ...p, blogpost: { text: e.target.value } };
              });
            }}
          />
        </div>
      </form>
      {/* IMAGE SELECTORS  */}

      <div className="flex gap-4 self-center mt-5">
        <button
          className="px-5 py-1.5 bg-black text-white rounded-md dark:bg-white dark:text-black min-w-28 min-h-10 disabled:opacity-65"
          disabled={isLoading}
          onClick={e => {
            e.preventDefault();
            isEditing && setBlogpostState(blogPostHydrated);
            setisEditing(p => !p);
          }}
        >
          {isEditing ? (
            <span className="flex items-center gap-2">
              <ImUndo className="text-xl" />
              Undo
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <GrEdit className="text-xl" />
              Edit
            </span>
          )}
        </button>
        <button
          className="disabled:opacity-65 active:bg-green-300 px-5 py-1.5 text-white rounded-md dark:bg-white dark:text-black bg-blue-800 min-w-28"
          disabled={!isEditing}
          onClick={() => handleUpdate()}
        >
          {isLoading ? (
            <span className="flex justify-center">
              <CgSpinnerAlt className="animate-spin text-lg" />
            </span>
          ) : (
            'Upload'
          )}
        </button>
      </div>
    </div>
  );
}
