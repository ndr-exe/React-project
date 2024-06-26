import { getSession } from '@auth0/nextjs-auth0';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const BASE_URL = process.env.NEXT_PUBLIC_URL;

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

export async function fetchCartItems() {
  const session = await getSession();
  if (Object.is(session, null)) {
    return {};
  }

  const sub = session!.user.sub;
  const response = await fetch(`${BASE_URL}/api/cart/fetch-cart-items`, {
    cache: 'no-store',
    headers: { Authorization: sub },
  });
  const data = await response.json();
  if (data.cartItems.rowCount === 0 || typeof data.cartItems.rows === 'undefined') return {};
  const cart: CartProducts = data.cartItems.rows[0].cart;
  if (cart.empty) return {};
  return cart;
}

export async function fetchItems() {
  const response = await fetch(`${BASE_URL}/api/items/fetch-items`);
  const { items } = await response.json();
  return items;
}

export async function fetchItem(id: number, forCart?: boolean) {
  const response = forCart
    ? await fetch(`${BASE_URL}/api/items/${id}?forCart=true`)
    : await fetch(`${BASE_URL}/api/items/${id}/`);
  const data = await response.json();
  if (true) {
    return data;
  } else {
    return redirect('/shop');
  }
}

export async function fetchCartItemsWithInfo() {
  const itemsRaw = await fetchCartItems();
  const itemsIDArr = Object.keys(itemsRaw);

  const items = [];

  for (let index = 0; index < itemsIDArr.length; index++) {
    const singleItem = await fetchItem(Number(itemsIDArr[index]), true);
    Object.values(singleItem).length > 0 &&
      items.push({ ...singleItem, count: itemsRaw[itemsIDArr[index]] });
  }

  return { items, itemsRaw };
}

// BLOG

export async function fetchBlog(id: number) {
  const session = await getSession();
  const userID = !Object.is(session, null) && session!.user.sub;

  const response = await fetch(`${BASE_URL}/api/blog?id=${id}`, {
    headers: { Authorization: userID },
  });

  const { blogpostHydrated } = await response.json();

  return blogpostHydrated;
}

export async function fetchBlogposts() {
  const response = await fetch(`${BASE_URL}/api/blog/fetch-all`, {});
  const data = await response.json();
  return data;
}

//ORDERS

export async function fetchOrders() {
  const session = await getSession();
  const userID = session && session.user && session.user.sub;
  const response = await fetch(`${BASE_URL}/api/orders`, {
    headers: { Authorization: userID },
  });
  const { orders } = await response.json();
  return orders;
}
