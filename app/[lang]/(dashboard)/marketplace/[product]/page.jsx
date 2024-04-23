import React from 'react'
import ProdcutPage from '../../../../components/Marketplace/ProductPage'
import { getDictionary } from "../../../dictionaries"



export default async function page({params}) {
  const dict = await getDictionary(params.lang)

  return <ProdcutPage params={params}  dict={dict}/>
}
