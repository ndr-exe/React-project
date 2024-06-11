import { cookies } from 'next/headers';
import Image from 'next/image';
import { BsCamera } from 'react-icons/bs';
import { CgEditMarkup } from 'react-icons/cg';
import { getDictionary } from '../../dictionaries';

export default async function page() {
  const lang = cookies().get('locale')?.value;
  const { profile } = await getDictionary(lang as string);

  return (
    <main className="lg:min-h-[calc(100vh-80px)] lg:flex lg:items-center ">
      <section className="px-7 py-4 sm:px-12 sm:py-6 md:py-8 md:px-36 lg:px-12 lg:w-5/12">
        <div>
          <div className="flex items-center gap-5 xl:gap-7">
            <div className="w-24 sm:w-28 xl:w-32 bg-indigo-600 rounded-full relative ">
              <Image src={'/'} alt="AVATAR" width={250} height={250} />
              <button className="absolute px-2 py-2 rounded-lg bg-white dark:bg-black shadow-xl text-xl -right-2 -bottom-1">
                <BsCamera />
              </button>
            </div>
            <div>
              <p className="text-lg xl:text-xl font-semibold">RandomNodar</p>
              <p className="text-sm sm:text-md xl:text-lg 2xl:text-xl tracking-wide text-gray-500">
                <span>Nodar</span> <span>Miminoshvili</span>
              </p>
            </div>
          </div>
          <form action="" className="mt-5 sm:mt-2">
            <button className="ml-auto flex gap-1 items-center rounded-md px-2 py-1 border xl:text-lg 2xl:text-xl">
              <span>{profile.edit}</span> <CgEditMarkup className="rotate-180" />
            </button>

            <div className="mb-3 xl:mb-4 2xl:mb-5 sm:float-left lg:float-none sm:w-2/5 lg:w-full xl:text-lg 2xl:text-xl">
              <label
                htmlFor="firstName"
                className="mb-1 xl:mb-2 2xl:mb-3 block font-light dark:text-gray-300"
              >
                {profile.firstName}
              </label>
              <input
                autoComplete="false"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Nodar"
                className="block border border-gray-400 rounded-md  w-full px-2 py-1 xl:py-1.5 2xl:py-2 placeholder:text-black outline-green-700 dark:bg-black dark:placeholder:text-white  "
              />
            </div>
            <div className="mb-3 xl:mb-4 2xl:mb-5 sm:float-right lg:float-none sm:w-7/12 lg:w-full xl:text-lg 2xl:text-xl">
              <label
                htmlFor="lastName"
                className="mb-1 xl:mb-2 2xl:mb-3 block font-light dark:text-gray-300"
              >
                {profile.lastName}
              </label>
              <input
                autoComplete="false"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Miminoshvili"
                className="block border border-gray-400 rounded-md  w-full px-2 py-1 xl:py-1.5 2xl:py-2 placeholder:text-black outline-green-700 dark:bg-black dark:placeholder:text-white  "
              />
            </div>
            <div className="mb-3 xl:mb-4 2xl:mb-5 sm:clear-left lg:clear-none xl:text-lg 2xl:text-xl">
              <label
                htmlFor="username"
                className="mb-1 xl:mb-2 2xl:mb-3 block font-light dark:text-gray-300"
              >
                {profile.username}
              </label>
              <input
                autoComplete="false"
                type="text"
                name="username"
                id="username"
                placeholder="RandomNodar"
                className="block border border-gray-400 rounded-md  w-full px-2 py-1 xl:py-1.5 2xl:py-2 placeholder:text-black outline-green-700 dark:bg-black dark:placeholder:text-white  "
              />
            </div>
            <div className="mb-3 xl:mb-4 2xl:mb-5 xl:text-lg 2xl:text-xl">
              <label
                htmlFor="email"
                className="mb-1 xl:mb-2 2xl:mb-3 block font-light dark:text-gray-300 "
              >
                {profile.email}
              </label>
              <input
                autoComplete="true"
                type="text"
                name="email"
                id="email"
                placeholder="Nodark@gmail.com"
                className="block border border-gray-400 rounded-md  w-full px-2 py-1 xl:py-1.5 2xl:py-2 placeholder:text-black outline-green-700 dark:bg-black dark:placeholder:text-white  "
              />
            </div>
            <button className="bg-black dark:bg-white dark:text-black text-white w-full py-2 xl:py-3 2xl:py-3.5 text-md xl:text-lg 2xl:text-xl rounded-lg mt-3">
              {profile.save}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
