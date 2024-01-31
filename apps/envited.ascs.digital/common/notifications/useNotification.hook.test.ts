/**
 * @jest-environment node
 */
import { notification } from './useNotification.hook'

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn().mockImplementation(x => x),
    error: jest.fn().mockImplementation(x => x),
    warning: jest.fn().mockImplementation(x => x),
  },
}))

describe('common/notification', () => {
  describe('info', () => {
    it('should return as expected', async () => {
      const toastifyStub = jest.fn().mockImplementation(x => x)

      const { info } = notification(toastifyStub)

      const result = info('INFO_TOAST')

      // when ... we want to get the notification
      // then ... it returns the content as expected
      expect(result).toEqual('INFO_TOAST')
    })
  })

  describe('success', () => {
    it('should return as expected', async () => {
      const toastifyStub = {
        success: jest.fn().mockImplementation(x => x),
        error: jest.fn().mockImplementation(x => x),
        warning: jest.fn().mockImplementation(x => x),
      }

      const { success } = notification(toastifyStub)

      const result = success('SUCCESS_TOAST')

      // when ... we want to get the notification
      // then ... it returns the content as expected
      expect(result).toEqual('SUCCESS_TOAST')
    })
  })

  describe('warning', () => {
    it('should return as expected', async () => {
      const toastifyStub = {
        success: jest.fn().mockImplementation(x => x),
        error: jest.fn().mockImplementation(x => x),
        warning: jest.fn().mockImplementation(x => x),
      }

      const { warning } = notification(toastifyStub)

      const result = warning('WARNING_TOAST')

      // when ... we want to get the notification
      // then ... it returns the content as expected
      expect(result).toEqual('WARNING_TOAST')
    })
  })

  describe('error', () => {
    it('should return as expected', async () => {
      const toastifyStub = {
        success: jest.fn().mockImplementation(x => x),
        error: jest.fn().mockImplementation(x => x),
        warning: jest.fn().mockImplementation(x => x),
      }

      const { error } = notification(toastifyStub)

      const result = error('ERROR_TOAST')

      // when ... we want to get the notification
      // then ... it returns the content as expected
      expect(result).toEqual('ERROR_TOAST')
    })
  })
})
