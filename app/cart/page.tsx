import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { fetchCartItemsWithInfo } from '../../api';
import CartList from '../components/Shop/Cart/CartList';
import { cookies } from 'next/headers';
import { getDictionary } from '../../dictionaries';
import { NextPage } from 'next/types';

const page: NextPage = withPageAuthRequired(
  async () => {
    const lang = cookies().get('locale')?.value;
    const { profile: localDict } = await getDictionary(lang as string);
    const { items, itemsRaw } = await fetchCartItemsWithInfo();
    const key = process.env.TEST_ENV_KEY;

    return <CartList items={items} itemsRaw={itemsRaw} key={key} />;
  },
  { returnTo: '/api/auth/login' }
);
export default page;
