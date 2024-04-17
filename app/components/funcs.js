'use server'

import { redirect } from "next/dist/server/api-utils"
import { cookies } from "next/headers"

export async function logout(){
  cookies().delete('token')
}