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
    const key = process.env.NEXT_PUBLIC_TEST_KEY;
    const secretKey = process.env.TEST_KEY;

    return (
      <div>
        <p>hehe</p>
        <p>{key}</p>
        <p>{secretKey}</p>
        <p>hehe</p>
        <CartList items={items} itemsRaw={itemsRaw} />;
      </div>
    );
  },
  { returnTo: '/api/auth/login' }
);
export default page;
