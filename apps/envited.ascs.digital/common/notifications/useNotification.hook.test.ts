import { notification } from './useNotification.hook'

describe('common/notification', () => {
  describe('info', () => {
    it('should return an info toast expected', async () => {
      // when ... we want to show a info notification
      // then ... it should show the info notification as expected
      const toast = {
        info: jest.fn().mockReturnValue('INFO_TOAST'),
      } as any

      const { info } = notification(toast)()
      const result = info('INFO_TOAST')
      expect(result).toEqual('INFO_TOAST')
      expect(toast.info).toHaveBeenCalledWith('INFO_TOAST')
    })
  })

  describe('success', () => {
    it('should return a success toast as expected', async () => {
      // when ... we want to show a success notification
      // then ... it should show the success notification as expected
      const toast = {
        success: jest.fn().mockReturnValue('SUCCESS_TOAST'),
      } as any

      const { success } = notification(toast)()
      const result = success('SUCCESS_TOAST')
      expect(result).toEqual('SUCCESS_TOAST')
      expect(toast.success).toHaveBeenCalledWith('SUCCESS_TOAST')
    })
  })

  describe('warning', () => {
    it('should return a warning toast as expected', async () => {
      // when ... we want to show a warning notification
      // then ... it should show the warning notification as expected
      const toast = {
        warning: jest.fn().mockReturnValue('WARNING_TOAST'),
      } as any

      const { warning } = notification(toast)()
      const result = warning('WARNING_TOAST')
      expect(result).toEqual('WARNING_TOAST')
      expect(toast.warning).toHaveBeenCalledWith('WARNING_TOAST')
    })
  })

  describe('error', () => {
    it('should return a error toast', async () => {
      // when ... we want to show an error notification
      // then ... it should show the error notification as expected
      const toast = {
        error: jest.fn().mockReturnValue('ERROR_TOAST'),
      } as any

      const { error } = notification(toast)()
      const result = error('ERROR_TOAST')
      expect(result).toEqual('ERROR_TOAST')
      expect(toast.error).toHaveBeenCalledWith('ERROR_TOAST')
    })
  })
})
