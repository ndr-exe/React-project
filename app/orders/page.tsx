import React from 'react';
import Order from '../components/Orders/Order';
import { fetchOrders } from '../../api';
// export const dynamic = 'force-dynamic';

export default async function page() {
  const orders: Awaited<any[]> = await fetchOrders();

  return (
    <main className="mx-auto max-w-screen-xl w-full h-full px-5 sm:px-10 md:pt-4  ">
      <h1 className="text-lg  lg:text-xl lg:text-center 2xl:text-2xl mt-3 mb-4">Recent Orders</h1>
      <div className="flex flex-col gap-5 xl:gap-7 items-center">
        {orders.map(order => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </main>
  );
}
