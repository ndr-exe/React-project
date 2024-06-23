'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import ImageSelector from './ImageSelector';
import { updateItems } from '../../../action';
import { usePathname, useRouter } from 'next/navigation';
import { PutBlobResult } from '@vercel/blob';
import { ImUndo } from 'react-icons/im';
import { GrEdit } from 'react-icons/gr';
import { CgSpinnerAlt } from 'react-icons/cg';

type newImg = {
  [key: string]: File;
};
const itemSkeleton = {
  id: 999,
  title: '',
  description: { text: '' },
  price: 0,
  brand: '',
  category: '',
  caliber: '',
  action: '',
  thumbnail: '',
  images: ['', ''],
  created_at: '',
  reviews: 0,
  stars: 0,
};

const defaultPlaceholderImgUrl = 'https://placehold.co/100x100/png';

export default function AddItem() {
  const [itemState, setItemState] = useState(() => itemSkeleton);
  const [isEditing, setisEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [newImages, setNewImages] = useState<newImg>({});
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  const pathname = usePathname();
  console.log(pathname);
  const idx = pathname.lastIndexOf('/');
  const updatedPath = pathname.slice(0, 16);
  console.log(updatedPath);
  async function handleUpdate() {
    if (!formRef.current?.reportValidity()) return;
    if (Object.values(newImages).length < 3) {
      setError(true);
      setTimeout(() => setError(false), 2500);
      return;
    }
    setIsLoading(true);
    const itemStateClone = { ...itemState };
    for (const ImgType in newImages) {
      const response = await fetch(`/api/upload-avatar?filename=${newImages[ImgType].name}`, {
        method: 'POST',
        body: newImages[ImgType],
      });

      const newBlob = (await response.json()) as PutBlobResult;
      if (ImgType === 'thumbnail') {
        itemStateClone.thumbnail = newBlob.url;
      } else if (ImgType === 'first') {
        itemStateClone.images[0] = newBlob.url;
      } else {
        itemStateClone.images[1] = newBlob.url;
      }
    }

    await updateItems(itemStateClone, 'ADD');
    setIsLoading(false);
    setisEditing(false);
    router.refresh();
  }

  return (
    <div className="flex flex-col items-center pt-5 pb-8">
      <form
        ref={formRef}
        action=""
        onSubmit={e => e.preventDefault()}
        className="w-full px-10 py-5 mx-auto flex flex-col gap-3"
      >
        {/* TITLE */}
        <div className="flex gap-2">
          <label htmlFor="title" className="basis-[12%]">
            Title
          </label>
          <input
            required
            minLength={2}
            maxLength={55}
            type="text"
            name="title"
            id="title"
            value={itemState.title}
            disabled={!isEditing}
            className="px-1.5 py-1.5 rounded-md border dark:bg-gray-800"
            onChange={e => {
              if (!isEditing) return;
              setItemState(p => {
                return { ...p, title: e.target.value };
              });
            }}
          />
        </div>

        {/* PRICE */}
        <div className="flex gap-2">
          <label htmlFor="price" className="basis-[12%]">
            Price
          </label>
          <input
            required
            pattern="^([1-9]\d{0,5})(\.\d{1,2})?$"
            title="Please enter a whole number between 1 and 999999, or a number with up to two decimal places"
            type="text"
            name="price"
            id="price"
            value={itemState.price}
            disabled={!isEditing}
            className="px-1.5 py-1.5 rounded-md border dark:bg-gray-800"
            onChange={e => {
              if (!isEditing) return;
              const price = isNaN(Number(e.target.value)) ? 0 : Number(e.target.value);
              setItemState(p => {
                return { ...p, price };
              });
            }}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="flex gap-2">
          <label htmlFor="description" className="basis-[12%]">
            Description
          </label>
          <textarea
            required
            minLength={155}
            maxLength={666}
            name="description"
            id="description"
            value={itemState.description.text}
            disabled={!isEditing}
            className="min-h-72 grow resize-none px-2 py-2 border rounded-lg dark:bg-gray-800"
            onChange={e => {
              if (!isEditing) return;
              setItemState(p => {
                return { ...p, description: { text: e.target.value } };
              });
            }}
          />
        </div>

        {/* BRAND */}
        <div className="flex gap-2">
          <label htmlFor="brand" className="basis-[12%]">
            Brand
          </label>
          <input
            required
            minLength={2}
            maxLength={55}
            type="text"
            name="brand"
            id="brand"
            value={itemState.brand}
            disabled={!isEditing}
            className="px-1.5 py-1.5 rounded-md border dark:bg-gray-800"
            onChange={e => {
              if (!isEditing) return;
              setItemState(p => {
                return { ...p, brand: e.target.value };
              });
            }}
          />
        </div>

        {/* CATEGORY */}
        <div className="flex gap-2">
          <label htmlFor="category" className="basis-[12%]">
            Category
          </label>
          <input
            required
            pattern="[a-z,A-z]{3,25}"
            title="Only letters (either case),no more than 25 characters."
            type="text"
            name="category"
            id="category"
            value={itemState.category}
            disabled={!isEditing}
            className="px-1.5 py-1.5 rounded-md border dark:bg-gray-800"
            onChange={e => {
              if (!isEditing) return;
              setItemState(p => {
                return { ...p, category: e.target.value };
              });
            }}
          />
        </div>
      </form>
      {/* IMAGE SELECTORS  */}
      <div
        className={`flex gap-5 items-start self-center mt-5 mb-8 relative ${
          !isEditing && 'pointer-events-none'
        }`}
      >
        <div>
          <p className="text-center">Thumbnail</p>
          <ImageSelector
            currentImg={defaultPlaceholderImgUrl}
            setImg={setNewImages}
            type="thumbnail"
          />
        </div>
        <div>
          <p className="text-center">#1 Image</p>
          <ImageSelector currentImg={defaultPlaceholderImgUrl} setImg={setNewImages} type="first" />
        </div>
        <div>
          <p className="text-center">#2 Image</p>
          <ImageSelector
            currentImg={defaultPlaceholderImgUrl}
            setImg={setNewImages}
            type="second"
          />
        </div>
        {error && (
          <p className="absolute text-red-500 -bottom-8 text-center w-full">
            All 3 Images must be Selected!
          </p>
        )}
      </div>
      {/*  */}

      <div className="flex gap-4 self-center mt-5">
        <button
          className="px-5 py-1.5 bg-black text-white rounded-md dark:bg-white dark:text-black min-w-28 min-h-10 disabled:opacity-65"
          disabled={isLoading}
          onClick={e => {
            e.preventDefault();
            isEditing && setItemState(itemSkeleton);
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
