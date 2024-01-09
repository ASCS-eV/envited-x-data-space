import { isNil } from 'ramda'
import { useEffect, useState } from 'react'

const getStorageValue = (key: string, defaultValue: any) =>
  !isNil(localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key) as string) : defaultValue

export const useLocalStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue)
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
