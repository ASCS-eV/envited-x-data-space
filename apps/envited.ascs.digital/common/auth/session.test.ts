import { _getServerSession } from './session'

describe('common/auth/session', () => {
  describe('getServerSession', () => {
    it('should fetch a server session with the correct parameters', async () => {
      // when ... we want to get the current session server side
      // then ... it should call the getServerSession function with the correct parameters
      const authOptions = 'AUTH_OPTIONS' as any
      const NAGetServerSession = jest.fn().mockResolvedValue('SESSION')

      const session = await _getServerSession(NAGetServerSession)(authOptions)()

      expect(NAGetServerSession).toHaveBeenCalledWith(authOptions)
      expect(session).toEqual('SESSION')
    })
  })
})
