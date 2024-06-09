import { getCartProducts } from '../../../api'
import ItemsGrid from './ItemsGrid'
export const dynamic = 'force-dynamic'



export default async function Main({dict}: {dict: DictType}) {
    const cart = await getCartProducts()
  return (
    <main className='grid grid-rows-1 row-span-9'>
        <ItemsGrid dict={dict} cart={cart}/>
    </main>
  )
}

