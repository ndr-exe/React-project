

export default function PageLayout({children}) {
  return (
    <div className='grid grid-cols-1 grid-rows-12 h-lvh text-white'>
        {children}
    </div>
  )
}
