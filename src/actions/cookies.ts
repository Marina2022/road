'use server'

import {cookies} from "next/headers";


export const setCookie = async ({key, value}: { key: string, value: string}) => {

  const cookiesStore = await cookies()  
  cookiesStore.set(key, value)
}

export const deleteCookie = async ({key}: { key: string}) => {
  const cookiesStore = await cookies()
  cookiesStore.delete(key)
}

export const getCookie = async ({key}: { key: string}) => {
  const cookiesStore = await cookies()
  return cookiesStore.get(key)
}