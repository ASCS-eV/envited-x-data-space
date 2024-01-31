/**
 * @jest-environment node
 */
import { toast } from 'react-toastify'

import { notification } from './useNotification.hook'

jest.mock('react-toastify', () => ({
  toast: {
    info: jest.fn().mockImplementation(x => x),
    success: jest.fn().mockImplementation(x => x),
    error: jest.fn().mockImplementation(x => x),
    warning: jest.fn().mockImplementation(x => x),
  },
}))

describe('common/notification', () => {
  describe('info', () => {
    it('should return as expected', async () => {
      const { info } = notification(toast)()
      const result = info('INFO_TOAST')

      // when ... we want to get the notification
      // then ... it returns the content as expected
      expect(result).toEqual('INFO_TOAST')
    })
  })

  describe('success', () => {
    it('should return as expected', async () => {
      const { success } = notification(toast)()
      const result = success('SUCCESS_TOAST')

      // when ... we want to get the notification
      // then ... it returns the content as expected
      expect(result).toEqual('SUCCESS_TOAST')
    })
  })

  describe('warning', () => {
    it('should return as expected', async () => {
      const { warning } = notification(toast)()
      const result = warning('WARNING_TOAST')

      // when ... we want to get the notification
      // then ... it returns the content as expected
      expect(result).toEqual('WARNING_TOAST')
    })
  })

  describe('error', () => {
    it('should return as expected', async () => {
      const { error } = notification(toast)()
      const result = error('ERROR_TOAST')

      // when ... we want to get the notification
      // then ... it returns the content as expected
      expect(result).toEqual('ERROR_TOAST')
    })
  })
})
