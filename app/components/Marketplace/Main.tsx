import ItemsGrid from './ItemsGrid'


export default function Main({dict}: {dict: DictType}) {
  return (
    <main className='grid grid-rows-1 row-span-9'>
        <ItemsGrid dict={dict}/>
    </main>
  )
}

