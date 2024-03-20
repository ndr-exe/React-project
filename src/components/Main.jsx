import ItemsGrid from './ItemsGrid'

export default function Main() {
  return (
    <main className='bg-zinc-900 grid grid-rows-1 grid-cols-12 row-span-9'>
        <ItemsGrid/>
        <div className='col-span-3 h-full px-7 flex flex-col items-start justify-end pb-28 '>
            <h2 className='text-4xl font-mono font-bold uppercase tracking-wider mb-4'>Bestsellers</h2>
            <p className='text-gray-400 font-serif'>
            There was in Arabia Rostevan, a king by the grace of God,
             happy, exalted, generous, modest, lord of many hosts and knights, 
             just and gracious, powerful, far-seeing, himself a peerless warrior, 
             moreover fluent in speech.
            </p>

        </div>
    </main>
  )
}
