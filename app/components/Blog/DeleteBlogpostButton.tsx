'use client';
import React, { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { deleteBlogpost } from '../../../action';
import { CgSpinnerAlt } from 'react-icons/cg';
import { useRouter } from 'next/navigation';

export default function DeleteBlogpostButton({ id }: { id: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function handleDelete() {
    setIsLoading(true);
    await deleteBlogpost(id);
    setIsLoading(false);
    router.refresh();
  }
  return (
    <button disabled={isLoading} onClick={() => handleDelete()}>
      {isLoading ? (
        <CgSpinnerAlt className="text-2xl animate-spin" />
      ) : (
        <RiDeleteBinLine className="text-2xl hover:text-orange-600" />
      )}
    </button>
  );
}
