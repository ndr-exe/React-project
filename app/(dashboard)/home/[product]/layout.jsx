

export default function layout({children}) {
    return (
      <main className='row-span-9'>
          <div className="w-full h-full max-w-screen-xl mx-auto mt-10">
          {children}
          </div>
      </main>
    )
  }
  