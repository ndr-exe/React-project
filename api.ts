import { revalidatePath } from "next/cache";

export const BASE_URL = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://localhost999.vercel.app"  


export interface User {
    id: number;
    name: string;
    email: string;
    age: number
  }


export async function getUsers() {
    // const response = await fetch(BASE_URL + '/api/get-users',{ next: { tags: ['users'] }});
    const response = await fetch(BASE_URL + '/api/get-users');
    // const response = await fetch(BASE_URL + '/api/get-users');
    const { users } = await response.json();
  
    return users.rows;
    
  }
  

  export async function addUser(formData: FormData) {
    const user = formData.get('name')
    const email = formData.get('email')
    const age = formData.get('age')
    return await fetch(BASE_URL + '/api/add-user', {
      method: 'POST',
      body: JSON.stringify({user, email, age}),
    });
  }  
  export async function UpdateUser(formData: FormData) {
    const user = formData.get('name')
    const email = formData.get('email')
    const age = formData.get('age')
    const id = formData.get('id')
    return await fetch(BASE_URL + `/api/update-user?name=${user}&email=${email}&age=${age}&id=${id}`, {
      method: 'GET',
    });
  }  

export async function deleteUser(id: number) {
    // revalidateTag('users') 
    return await fetch(`${BASE_URL}/api/delete-user`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userToDelete: id} ),
    })
  }


export async function getCartProducts(){
  const response = await fetch(`${BASE_URL}/api/get-cart-products`,{cache: 'no-store'})
  const data =  await response.json()
  const cart: CartProducts = data.cartProducts.rows[0].cart_products
  return cart

}


export async function getCustomerAvatar(sub: any){
  revalidatePath('/','layout')
  const response = await fetch(`${BASE_URL}/api/avatar/get-avatar`,{cache: 'no-store', headers: {Authorization: sub }})
  const data =  await response.json()
  return data.avatar.rows
}