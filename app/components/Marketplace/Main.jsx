import ItemsGrid from '../Marketplace/ItemsGrid'


export default function Main({dict}) {
  return (
    <main className='grid grid-rows-1 row-span-9'>
        <ItemsGrid dict={dict}/>
    </main>
  )
}

