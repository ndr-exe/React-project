'use server';

import { revalidatePath } from 'next/cache';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://localhost999.vercel.app';

const AUTH0_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklZdDYzQktpM0c2MlRfRGYzMVczeCJ9.eyJpc3MiOiJodHRwczovL2Rldi1qc2VzYnE4dDhubW9zdWZ6LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJuOGNyb0pTS2o5NnVWV1VXRm92N0IzaEJQME1Wd1p3WkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtanNlc2JxOHQ4bm1vc3Vmei51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTcxODM2NzI3MCwiZXhwIjoxNzIwODcyODcwLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIHJlYWQ6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgZGVsZXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDphY3Rpb25zIHVwZGF0ZTphY3Rpb25zIGRlbGV0ZTphY3Rpb25zIGNyZWF0ZTphY3Rpb25zIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6aW5zaWdodHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpsb2dzX3VzZXJzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgZGVsZXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIHJlYWQ6bGltaXRzIHVwZGF0ZTpsaW1pdHMgY3JlYXRlOnJvbGVfbWVtYmVycyByZWFkOnJvbGVfbWVtYmVycyBkZWxldGU6cm9sZV9tZW1iZXJzIHJlYWQ6ZW50aXRsZW1lbnRzIHJlYWQ6YXR0YWNrX3Byb3RlY3Rpb24gdXBkYXRlOmF0dGFja19wcm90ZWN0aW9uIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6YXV0aGVudGljYXRpb25fbWV0aG9kcyB1cGRhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyBkZWxldGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgZGVsZXRlOnBob25lX3Byb3ZpZGVycyBjcmVhdGU6cGhvbmVfcHJvdmlkZXJzIHJlYWQ6cGhvbmVfcHJvdmlkZXJzIHVwZGF0ZTpwaG9uZV9wcm92aWRlcnMgZGVsZXRlOnBob25lX3RlbXBsYXRlcyBjcmVhdGU6cGhvbmVfdGVtcGxhdGVzIHJlYWQ6cGhvbmVfdGVtcGxhdGVzIHVwZGF0ZTpwaG9uZV90ZW1wbGF0ZXMgY3JlYXRlOmVuY3J5cHRpb25fa2V5cyByZWFkOmVuY3J5cHRpb25fa2V5cyB1cGRhdGU6ZW5jcnlwdGlvbl9rZXlzIGRlbGV0ZTplbmNyeXB0aW9uX2tleXMgcmVhZDpzZXNzaW9ucyBkZWxldGU6c2Vzc2lvbnMgcmVhZDpyZWZyZXNoX3Rva2VucyBkZWxldGU6cmVmcmVzaF90b2tlbnMgY3JlYXRlOnNlbGZfc2VydmljZV9wcm9maWxlcyByZWFkOnNlbGZfc2VydmljZV9wcm9maWxlcyB1cGRhdGU6c2VsZl9zZXJ2aWNlX3Byb2ZpbGVzIGRlbGV0ZTpzZWxmX3NlcnZpY2VfcHJvZmlsZXMgY3JlYXRlOnNzb19hY2Nlc3NfdGlja2V0cyByZWFkOmZvcm1zIHVwZGF0ZTpmb3JtcyBkZWxldGU6Zm9ybXMgY3JlYXRlOmZvcm1zIHJlYWQ6Zmxvd3MgdXBkYXRlOmZsb3dzIGRlbGV0ZTpmbG93cyBjcmVhdGU6Zmxvd3MgcmVhZDpmbG93c192YXVsdCB1cGRhdGU6Zmxvd3NfdmF1bHQgZGVsZXRlOmZsb3dzX3ZhdWx0IGNyZWF0ZTpmbG93c192YXVsdCByZWFkOmNsaWVudF9jcmVkZW50aWFscyBjcmVhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIHVwZGF0ZTpjbGllbnRfY3JlZGVudGlhbHMgZGVsZXRlOmNsaWVudF9jcmVkZW50aWFscyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6Im44Y3JvSlNLajk2dVZXVVdGb3Y3QjNoQlAwTVZ3WndaIn0.QQsL8_jOipg5JT4pY9YBp6ETJm3BZ2sXMFm-gu6AD31YBK4YoMYqrkyUxteavyhAsl0sQTM7r0C6tmDyzxjWHTn0UryQUeRypUnxGe21ebaEbOvkgmsLwYa4k9eDG8YUInMgeAKcpb4U5pyhAM39VlXu9AmMTOH51RsEU4e-4fHcOCVL83iXGKrUqfTZAHtbEy1vSBEryYBT65UKXfqn6M5Nnn2Y-kz5qQ79eeOYLeE9iUuVlaDTssUatFpMfglrwJ4q1h-ImSqeV4P8M1PSFn1xS88kE1Uz9QySTeo-vXaW4g-xhd_zks_731Ax9VTVfi5ADjJ-1mzfgIRJDEO6MQ';

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
      .then(result => console.log(result))
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
    .then(result => console.log(result))
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
    .then(result => console.log(result))
    .then(() =>
      fetch(`${BASE_URL}/api/user/update-avatar-on-postgres`, {
        method: 'PATCH',
        body: JSON.stringify({ blobUrl, id }),
      })
    )
    .catch(error => console.log('error', error));

  revalidatePath('/', 'layout');
}
