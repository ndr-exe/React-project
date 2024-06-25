import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { fetchCartItemsWithInfo } from '../../api';
import CartList from '../components/Shop/Cart/CartList';
import { cookies } from 'next/headers';
import { getDictionary } from '../../dictionaries';
import { NextPage } from 'next/types';

const page: NextPage = withPageAuthRequired(
  async () => {
    const lang = cookies().get('locale')?.value;
    const dict = await getDictionary(lang as string);
    const { items, itemsRaw } = await fetchCartItemsWithInfo();

    return (
      <div>
        <CartList items={items} itemsRaw={itemsRaw} dict={dict} />;
      </div>
    );
  },
  { returnTo: '/api/auth/login' }
);
export default page;
