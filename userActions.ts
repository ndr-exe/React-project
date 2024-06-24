'use server';

import { getSession } from '@auth0/nextjs-auth0';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const BASE_URL = process.env.NEXT_PUBLIC_URL;

const AUTH0_TOKEN = process.env.AUTH0_MANAGMENT_TOKEN;

type formData = {
  picture: string;
  firstName: string;
  familyName: string;
  username: string;
  email: string;
};

export async function fetchAuth0UserData(userID: string) {
  const myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', `Bearer ${AUTH0_TOKEN}`);

  const requestOptions: any = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  try {
    const response = await fetch(
      `https://dev-jsesbq8t8nmosufz.us.auth0.com/api/v2/users/${userID}`,
      requestOptions
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}

export async function fetchAuth0UserRoles(userID: string) {
  const myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', `Bearer ${AUTH0_TOKEN}`);

  const requestOptions: any = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  try {
    const response = await fetch(
      `https://dev-jsesbq8t8nmosufz.us.auth0.com/api/v2/users/${userID}/roles`,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: true };
  }
}

export async function fetchAuth0UserWithMetadataAndRoles(id: string) {
  const userInfo = await fetchAuth0UserData(id);
  const userRoles = await fetchAuth0UserRoles(id);
  return { userInfo, userRoles };
}

export async function compareUserIDsToGrantPermission(inputID: string) {
  const session = await getSession();
  if (Object.is(session, null) || session!.user.sub !== inputID) {
    return redirect('/');
  } else {
    return;
  }
}

export async function updateUser({ id, formData }: { id: string; formData: formData }) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', `Bearer ${AUTH0_TOKEN}`);

  let raw;

  if (!id.startsWith('auth0')) {
    raw = JSON.stringify({
      user_metadata: {
        picture: formData.picture,
        firstName: formData.firstName,
        familyName: formData.familyName,
        username: formData.username,
      },
    });
  } else {
    raw = JSON.stringify({
      picture: formData.picture,
      name: formData.firstName,
      family_name: formData.familyName,
      username: formData.username,
    });

    const requestOptions: any = {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify({ email: formData.email }),
      redirect: 'follow',
    };

    fetch(`https://dev-jsesbq8t8nmosufz.us.auth0.com/api/v2/users/${id}`, requestOptions)
      .then(response => response.text())
      .catch(error => console.log('error', error));
  }

  const requestOptions: any = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(`https://dev-jsesbq8t8nmosufz.us.auth0.com/api/v2/users/${id}`, requestOptions)
    .then(response => response.text())
    .then(() =>
      fetch(`${BASE_URL}/api/user/update-credentials-on-postgres`, {
        method: 'PATCH',
        body: JSON.stringify({ id, username: formData.username }),
      })
    )
    .catch(error => console.log('error', error));
}

export async function uploadAvatarUrlToAuth0({ id, blobUrl }: { id: string; blobUrl: string }) {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', `Bearer ${AUTH0_TOKEN}`);

  let raw;

  if (!id.startsWith('auth0')) {
    raw = JSON.stringify({
      user_metadata: {
        picture: blobUrl,
      },
    });
  } else {
    raw = JSON.stringify({
      picture: blobUrl,
    });
  }
  const requestOptions: any = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(`https://dev-jsesbq8t8nmosufz.us.auth0.com/api/v2/users/${id}`, requestOptions)
    .then(response => response.text())
    .then(() =>
      fetch(`${BASE_URL}/api/user/update-avatar-on-postgres`, {
        method: 'PATCH',
        body: JSON.stringify({ blobUrl, id }),
      })
    )
    .catch(error => console.log('error', error));

  revalidatePath('/', 'layout');
}

type UserRoles = {
  id: string;
  name: string;
  description: string;
};

export async function returnUser() {
  const session = await getSession();
  return session && session.user && session.user.sub;
}

export async function checkIfUserIsAdmin() {
  const session = await getSession();
  if (session === null) return false;
  const roles: Awaited<UserRoles[]> = await fetchAuth0UserRoles(session?.user.sub);
  if (!Array.isArray(roles)) return false;
  return roles.findIndex(role => role.id === 'rol_jYB8r272UIcUllni') !== -1;
}
