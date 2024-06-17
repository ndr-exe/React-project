import { getSession } from '@auth0/nextjs-auth0';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://localhost999.vercel.app';

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

export async function getUsers() {
  const response = await fetch(BASE_URL + '/api/get-users');
  const { users } = await response.json();
  return users.rows;
}

export async function addUser(formData: FormData) {
  const user = formData.get('name');
  const email = formData.get('email');
  const age = formData.get('age');
  return await fetch(BASE_URL + '/api/add-user', {
    method: 'POST',
    body: JSON.stringify({ user, email, age }),
  });
}
export async function UpdateUser(formData: FormData) {
  const user = formData.get('name');
  const email = formData.get('email');
  const age = formData.get('age');
  const id = formData.get('id');
  return await fetch(
    BASE_URL + `/api/update-user?name=${user}&email=${email}&age=${age}&id=${id}`,
    {
      method: 'GET',
    }
  );
}

export async function deleteUser(id: number) {
  return await fetch(`${BASE_URL}/api/delete-user`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userToDelete: id }),
  });
}

export async function fetchCartItems() {
  const session = await getSession();
  if (Object.is(session, null)) {
    return {};
  }

  const sub = session!.user.sub;
  const response = await fetch(`${BASE_URL}/api/get-cart-products`, {
    cache: 'no-store',
    headers: { Authorization: sub },
  });
  const data = await response.json();
  if (data.cartItems.rowCount === 0) return {};
  const cart: CartProducts = data.cartItems.rows[0].cart;
  if (cart.empty) return {};
  return cart;
}

export async function getCustomerAvatar(sub: any) {
  revalidatePath('/', 'layout');
  const response = await fetch(`${BASE_URL}/api/avatar/get-avatar`, {
    cache: 'no-store',
    headers: { Authorization: sub },
  });
  const data = await response.json();
  return data.avatar.rows;
}

export async function fetchItems() {
  const response = await fetch(`${BASE_URL}/api/items/fetch-items`);
  const { items } = await response.json();
  return items;
}

export async function fetchItem(id: number) {
  const response = await fetch(`${BASE_URL}/api/items/${id}/`);
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
    const singleItem = await fetchItem(Number(itemsIDArr[index]));
    items.push({ ...singleItem, count: itemsRaw[itemsIDArr[index]] });
  }

  return { items, itemsRaw };
}
