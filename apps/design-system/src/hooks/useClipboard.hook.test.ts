import { act, renderHook } from '@testing-library/react-hooks'

import { useClipboard } from './useClipboard.hook'

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue('COPIED'),
  },
})

describe('common/clipboard/useClipboard.hook', () => {
  describe('clipboard', () => {
    it('should write text to clipboard', async () => {
      // when ... we want to copy text to clipboard
      const { result } = renderHook(() => useClipboard())
      await act(async () => result.current.copyToClipboard('TEXT'))

      // then ... should copied as expected
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('TEXT')
    })
  })
})
