import { _signIn } from './auth'

describe('common/auth/auth', () => {
  describe('signIn', () => {
    it('should call the sign in method with the expected parameters', async () => {
      // when ... we want to sign a user in
      // then ... it should call the sign in method with the expected parameters
      const NASignIn = jest.fn().mockResolvedValue('SIGNED_IN')
      const pkh = 'PKH'

      const session = await _signIn(NASignIn)({ pkh })
      expect(NASignIn).toHaveBeenCalledWith('credentials', {
        pkh,
        callbackUrl: '/dashboard',
      })
      expect(session).toEqual('SIGNED_IN')
    })
  })
})
