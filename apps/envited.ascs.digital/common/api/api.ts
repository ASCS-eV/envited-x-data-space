'use client'

import useSWR from 'swr'

export const fetcher = (url: string) => fetch(url).then(r => r.json())

export const useGetUserById = (id: string) => {
  return useSWR(`/api/user/${id}`, fetcher)
}
