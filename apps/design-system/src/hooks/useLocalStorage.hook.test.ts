import { renderHook } from '@testing-library/react-hooks'

import { useLocalStorage } from './useLocalStorage.hook'

describe('common/useLocalStorage/useLocalStorage.hook', () => {
  describe('useLocalStorage', () => {
    it.each([
      ['KEY', 'VALUE'],
      ['', 'VALUE'],
    ])('should use localStorage', async (key: string, value: any) => {
      // when ... we want to set a value into local storage
      // then ... we should store it as expected
      const { result } = renderHook(() => useLocalStorage(key, value))
      expect(result.current[0]).toEqual(value)
    })
  })
})
