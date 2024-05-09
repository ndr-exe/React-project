
export default function layout({children}:{children: React.ReactNode}) {

    return (
        <div className="h-lvh bg-gray-100">
            <div className="h-full w-full flex max-w-screen-xl mx-auto items-center gap-5">

            <div className="bg-gray-200 h-[90%] w-[20%] rounded-xl">
                <h1 className="text-center pt-5 text-xl text-gray-800 font-extrabold">
                    Admin Panel
                </h1>
                <ul className="mt-10 text-lg flex justify-center font-bold text-indigo-800">
                    <li className={`bg-gray-300 py-2 px-[36%] rounded-xl`}>Users</li>
                </ul>
            </div>
            <div className="bg-gray-300 h-[90%] flex-1 rounded-xl">
                {children}
            </div>
            </div>

        </div>
    )
  }
  