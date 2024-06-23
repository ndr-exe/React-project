'use client';
import { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { CgSpinnerAlt } from 'react-icons/cg';
import { deleteItem } from '../../../action';
import { useRouter } from 'next/navigation';

export default function DeleteItem({ id }: { id: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleDeleteItem() {
    setIsLoading(true);
    await deleteItem(id);
    router.refresh();
    setIsLoading(false);
  }

  return (
    <button
      className="disabled:opacity-50 transition-opacity min-w-10 min-h-10 border rounded-md shadow-md flex items-center justify-center"
      disabled={isLoading}
      onClick={() => handleDeleteItem()}
    >
      {isLoading ? (
        <CgSpinnerAlt className="text-xl animate-spin" />
      ) : (
        <RiDeleteBin6Line className="textlxl" />
      )}
    </button>
  );
}
