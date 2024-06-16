'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { BsCamera } from 'react-icons/bs';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineSettingsBackupRestore } from 'react-icons/md';
import { ImSpinner9 } from 'react-icons/im';
import { AiOutlineLoading } from 'react-icons/ai';

import { manageFormData } from '../../../helperFunctions';
import { updateUser, uploadAvatarUrlToAuth0 } from '../../../userActions';
import { PutBlobResult } from '@vercel/blob';
import { useRouter } from 'next/navigation';

export default function ProfileInfo({
  localDict,
  userFullInfo,
}: {
  localDict: LocalDict;
  userFullInfo: User;
}) {
  const [activeForm, setIsActiveForm] = useState(false);
  const [changeForm, setChangeForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [formData, setFormData] = useState(() => manageFormData(userFullInfo));
  const [avatarError, setAvatarError] = useState(false);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const usernameRef = useRef<null | HTMLInputElement>(null);
  const formRef = useRef<null | HTMLFormElement>(null);
  const router = useRouter();

  async function handleForm() {
    setLoading(true);
    await updateUser({ id: userFullInfo.userInfo.user_id, formData });
    setLoading(false);
    router.refresh();
  }

  async function handleReset() {
    setFormData(() => manageFormData(userFullInfo));
  }

  async function handleAvatarChange() {
    const img = inputRef.current!.files![0];
    if (img.size > 3500000) {
      console.log('file is bigger');
      setAvatarError(true);
      setTimeout(() => setAvatarError(false), 3500);
      return;
    }
    setAvatarLoading(true);
    const id = userFullInfo.userInfo.user_id;

    const response = await fetch(`/api/upload-avatar?filename=${img.name}`, {
      method: 'POST',
      body: img,
    });

    const newBlob = (await response.json()) as PutBlobResult;
    console.log(newBlob);

    const avatarUrl = await uploadAvatarUrlToAuth0({ id, blobUrl: newBlob.url });

    setFormData(p => {
      return {
        ...p,
        picture: newBlob.url,
      };
    });
    setAvatarLoading(false);
    router.refresh();
  }

  return (
    <section className="px-7 py-4 sm:px-12 sm:py-6 md:py-8 md:px-36 lg:px-12 lg:w-5/12">
      <div>
        <div className="flex items-center gap-5 xl:gap-7">
          <div className="w-24 h-24 sm:w-28 sm:h-28  xl:w-32 xl:h-32 rounded-full relative shrink-0 ">
            <Image
              src={formData.picture}
              alt="AVATAR"
              width={150}
              height={150}
              className="rounded-full object-fill w-24 h-24 sm:w-28 sm:h-28  xl:w-32 xl:h-32"
            />

            {/* CHANGE AVATAR */}
            <button
              onClick={() => {
                inputRef.current!.click();
              }}
              className="absolute px-2 py-2 rounded-lg bg-white dark:bg-black shadow-xl text-xl -right-2 -bottom-1"
            >
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                ref={inputRef}
                // onSelect={() => console.log('heeeyyyy')}
                onInput={() => handleAvatarChange()}
                className="absolute hidden"
              />
              {!avatarLoading ? <BsCamera /> : <AiOutlineLoading className="animate-spin" />}
            </button>
            {avatarError && (
              <div className="w-[210%] absolute -bottom-8 text-sm text-red-500">
                IMG must be less than 3.5 MB
              </div>
            )}
          </div>
          <div className="">
            <p className="text-lg xl:text-xl font-semibold">{formData.username}</p>
            <p className="text-sm sm:text-md xl:text-lg 2xl:text-xl tracking-wide text-gray-500">
              <span>{formData.firstName}</span> <span>{formData.familyName}</span>
            </p>
          </div>
        </div>
        <form ref={formRef} onChange={() => setChangeForm(true)} action="" className="mt-5 sm:mt-2">
          {/* EDIT FORM */}
          <button
            onClick={e => {
              e.preventDefault();
              // updateUser();
              if (activeForm) {
                handleReset();
                setChangeForm(false);
              }
              setIsActiveForm(p => !p);
            }}
            className="ml-auto flex gap-1 items-center rounded-md px-1 py-1 min-w-24 border xl:text-xl 2xl:text-2xl 2xl:py-2 2xl:px-2 justify-center xl:min-w-32 dark:hover:text-black dark:hover:bg-white hover:bg-black hover:text-white transition-colors "
          >
            {activeForm ? (
              <>
                <span>{localDict.revert}</span> <MdOutlineSettingsBackupRestore />
              </>
            ) : (
              <>
                <span>{localDict.edit}</span> <CiEdit className="" />
              </>
            )}
          </button>

          {/* FIRST NAME */}
          <div className="mb-3 xl:mb-4 2xl:mb-5 sm:float-left lg:float-none sm:w-2/5 lg:w-full xl:text-lg 2xl:text-xl">
            <label
              htmlFor="firstName"
              className="mb-1 xl:mb-2 2xl:mb-3 block font-light dark:text-gray-300"
            >
              {localDict.firstName}
            </label>
            <input
              onChange={e => {
                setFormData(p => {
                  return {
                    ...p,
                    firstName: e.target.value,
                  };
                });
              }}
              value={formData.firstName}
              disabled={!activeForm}
              autoComplete="false"
              type="text"
              name="firstName"
              id="firstName"
              required
              pattern="[A-Za-z]{2,20}"
              title="Only letters (either case),no more than 20 characters."
              maxLength={25}
              className="block border border-gray-400 rounded-md  w-full px-2 py-1 xl:py-1.5 2xl:py-2 outline-green-700 dark:bg-black disabled:opacity-40 "
            />
          </div>

          {/* FAMILY NAME */}
          <div className="mb-3 xl:mb-4 2xl:mb-5 sm:float-right lg:float-none sm:w-7/12 lg:w-full xl:text-lg 2xl:text-xl">
            <label
              htmlFor="lastName"
              className="mb-1 xl:mb-2 2xl:mb-3 block font-light dark:text-gray-300"
            >
              {localDict.lastName}
            </label>
            <input
              onChange={e => {
                setFormData(p => {
                  return {
                    ...p,
                    familyName: e.target.value,
                  };
                });
              }}
              value={formData.familyName}
              disabled={!activeForm}
              autoComplete="false"
              type="text"
              name="lastName"
              id="lastName"
              required
              pattern="[A-Za-z]{2,20}"
              title="Only letters (either case),no more than 20 characters."
              maxLength={25}
              className="block border border-gray-400 rounded-md  w-full px-2 py-1 xl:py-1.5 2xl:py-2  outline-green-700 dark:bg-black  disabled:opacity-40 "
            />
          </div>

          {/* USERNAME */}
          <div className="mb-3 xl:mb-4 2xl:mb-5 sm:clear-left lg:clear-none xl:text-lg 2xl:text-xl">
            <label
              htmlFor="username"
              className="mb-1 xl:mb-2 2xl:mb-3 block font-light dark:text-gray-300"
            >
              {localDict.username}
            </label>
            <input
              onChange={e => {
                setFormData(p => {
                  return {
                    ...p,
                    username: e.target.value,
                  };
                });
              }}
              value={formData.username}
              disabled={!activeForm}
              autoComplete="false"
              type="text"
              name="username"
              id="username"
              required
              ref={usernameRef}
              pattern="[A-Za-z0-9_]{1,15}"
              maxLength={20}
              title="Only letters (either case), numbers, and the underscore; no more than 15 characters."
              className="block border border-gray-400 rounded-md  w-full px-2 py-1 xl:py-1.5 2xl:py-2  outline-green-700 dark:bg-black disabled:opacity-40   "
            />
          </div>

          {/* EMAIL */}
          <div className="mb-3 xl:mb-4 2xl:mb-5 xl:text-lg 2xl:text-xl">
            <label
              htmlFor="email"
              className="mb-1 xl:mb-2 2xl:mb-3 block font-light dark:text-gray-300 "
            >
              {localDict.email}
            </label>
            <input
              onChange={e => {
                setFormData(p => {
                  return {
                    ...p,
                    email: e.target.value,
                  };
                });
              }}
              value={formData.email}
              disabled={!userFullInfo.userInfo.user_id.startsWith('auth0') || !activeForm}
              autoComplete="true"
              type="email"
              name="email"
              id="email"
              required
              className="block border border-gray-400 mb-5 rounded-md w-full px-2 py-1 xl:py-1.5 2xl:py-2  outline-green-700 dark:bg-black disabled:opacity-40  "
            />
          </div>

          {/* SAVE CHANGES */}
          <button
            onClick={e => {
              e.preventDefault();
              const valid = formRef.current!.checkValidity();
              if (valid) {
                handleForm();
                setIsActiveForm(false);
                setChangeForm(false);
              } else {
                formRef.current!.reportValidity();
              }
            }}
            disabled={loading || !changeForm}
            className={`bg-black dark:bg-white dark:text-black text-white w-full py-2 xl:py-3 2xl:py-3.5 text-md xl:text-lg 2xl:text-xl rounded-lg disabled:opacity-50 transition-colors min-h-10 xl:min-h-14 ${
              !loading &&
              activeForm &&
              changeForm &&
              'hover:bg-white hover:text-black hover:shadow-lg dark:hover:bg-black dark:hover:text-white dark:hover:outline'
            }  ${loading && ' flex justify-center items-center'}`}
          >
            {loading ? <AiOutlineLoading className="animate-spin" /> : localDict.save}
          </button>
        </form>
      </div>
    </section>
  );
}
