'use server';

import { cookies } from 'next/headers';
import { BASE_URL } from './api';
import { revalidatePath } from 'next/cache';
import { getSession } from '@auth0/nextjs-auth0';
import { fetchAuth0UserData } from './userActions';

export async function logout() {
  cookies().delete('token');
}

export async function handleLangChange(lang: string) {
  cookies().set('locale', lang);
}

export async function checkLocaleLang() {
  const lang = cookies().get('locale');
  if (!lang) return 'en';
  return lang.value;
}

export async function setDarkMode(mode: string, state: boolean) {
  cookies().set(mode, state.toString());
}

export async function getThemeInfo() {
  const theme = cookies().get('darkMode');
  if (typeof theme === 'undefined') return false;
  return theme.value === 'true' ? true : false;
}

export async function updateCart(cart: CartProducts) {
  const session = await getSession();
  let sub;
  if (session && session.user) sub = session.user.sub;

  const response = await fetch(`${BASE_URL}/api/cart/update-cart`, {
    method: 'PUT',
    body: JSON.stringify(cart),
    headers: { Authorization: sub },
  });
  revalidatePath('/', 'layout');
  const data = await response.json();
  return data;
}

type reviewWithRating = {
  review: { text: string };
  star: number;
  author_id: string;
  product_id: number;
  // author_username: string,
  // author_avatar: string,
};

export async function submitReview(reviewWithRating: reviewWithRating) {
  const userInfoRaw = await fetchAuth0UserData(reviewWithRating.author_id);
  const userInfo = reviewWithRating.author_id.startsWith('auth0')
    ? { author_username: userInfoRaw.username, author_avatar: userInfoRaw.picture }
    : {
        author_username: userInfoRaw.user_metadata.username,
        author_avatar: userInfoRaw.user_metadata.picture,
      };
  const reviewWithAuthorInfo = { ...reviewWithRating, ...userInfo };

  await fetch(`${BASE_URL}/api/items/review`, {
    method: 'POST',
    body: JSON.stringify(reviewWithAuthorInfo),
  });
  revalidatePath('/', 'page');
}

type UpdatedReview = {
  review: {
    text: string | undefined;
  };
  star: number;
  id: number;
};

export async function updateReview(reviewWithRating: UpdatedReview) {
  await fetch(`${BASE_URL}/api/items/review`, {
    method: 'PATCH',
    body: JSON.stringify(reviewWithRating),
  });
  revalidatePath('/', 'page');
}
export async function deleteReview(id: number) {
  await fetch(`${BASE_URL}/api/items/review`, {
    method: 'DELETE',
    body: JSON.stringify(id),
  });
  revalidatePath('/', 'page');
}
