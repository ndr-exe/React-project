import React from 'react'
import ProdcutPage from '../../../../components/Marketplace/ProductPage'
import { getDictionary } from "../../../dictionaries"

type ParamsType = {
  params: {lang: string, product: string, id: number}
}

export default async function page({params}: ParamsType) {
  const dict = await getDictionary(params.lang)

  return <ProdcutPage params={params}  dict={dict}/>
}
