'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { BsCamera } from 'react-icons/bs';

export default function BlogImageSelector({
  currentImg,
  setImg,
  type,
}: {
  currentImg: string;
  setImg: any;
  type: string;
}) {
  const [avatarError, setAvatarError] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [localImage, setLocalImage] = useState(() => currentImg);

  function handleInput() {
    const img = inputRef.current!.files![0];
    if (img.size > 3500000) {
      setAvatarError(true);
      setTimeout(() => setAvatarError(false), 3500);
      return;
    }
    const local = URL.createObjectURL(img);
    setLocalImage(local);
    setImg((p: any) => {
      return { ...p, [type]: img };
    });
  }

  return (
    <div className="relative">
      <div className="w-full aspect-[3/1]  relative ">
        <Image src={localImage} fill alt={`product`} className="object-cover" />
      </div>
      <button
        onClick={e => {
          inputRef.current!.click();
        }}
        className="absolute px-2 py-2 rounded-lg bg-white dark:bg-black shadow-xl text-xl right-0 -bottom-1"
      >
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          ref={inputRef}
          onInput={() => handleInput()}
          className="absolute hidden"
        />
        <BsCamera />
      </button>
      {avatarError && (
        <div className="w-[210%] absolute -bottom-8 text-sm text-red-500">
          IMG must be less than 3.5 MB
        </div>
      )}
    </div>
  );
}
