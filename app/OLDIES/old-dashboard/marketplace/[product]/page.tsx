import React from 'react';
import ProdcutPage from '../../../../old-components/Marketplace/ProductPage';
import { getDictionary } from '../../../dictionaries';
import { cookies } from 'next/headers';

export default async function page({
  params,
}: {
  params: { product: string };
}) {
  const lang = cookies().get('locale')?.value;
  const dict = await getDictionary(lang as string);

  return <ProdcutPage params={params} dict={dict} />;
}
