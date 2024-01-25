import { USER_CREDENTIAL } from '../../common/fixtures'
import { Role, Session, User } from '../types'
import * as SUT from './guards'

describe('common/guards', () => {
  describe('userIsIssuedByLoggedInUser', () => {
    it('should check if user is issued by logged in user', () => {
      // when ... we want to check if the user is issued by the session user
      const user = {
        id: 'USER_ID',
        issuerId: 'PKH',
      }

      const session = {
        user: {
          pkh: 'PKH',
        },
      }
      // then ... we should get the result as expected
      const result = SUT.userIsIssuedByLoggedInUser(user as User)(session as Session)

      expect(result).toEqual(true)
    })
  })

  describe('isOwnUser', () => {
    it('should check if logged in user is own user', () => {
      // when ... we want to check if the user is the same as session user
      const user = {
        id: 'PKH',
        issuerId: 'ISSUER_ID',
      }

      const session = {
        user: {
          pkh: 'PKH',
        },
      }
      // then ... we should get the result as expected
      const result = SUT.isOwnUser(user as User)(session as Session)

      expect(result).toEqual(true)
    })
  })

  describe('isFederator', () => {
    it.each([
      [Role.federator, true],
      [Role.principal, false],
    ])('should check if logged in user is a federator', (role, expected) => {
      // when ... we want to check if the user has the federator role
      const session = {
        user: {
          pkh: 'PKH',
          role,
        },
      }
      // then ... we should get the result as expected
      const result = SUT.isFederator(session as Session)

      expect(result).toEqual(expected)
    })
  })

  describe('isPrincipal', () => {
    it.each([
      [Role.federator, false],
      [Role.principal, true],
      [Role.user, false],
    ])('should check if logged in user is a principal', (role, expected) => {
      // when ... we want to check if the user has the principal
      const session = {
        user: {
          pkh: 'PKH',
          role,
        },
      }
      // then ... we should get the result as expected
      const result = SUT.isPrincipal(session as Session)

      expect(result).toEqual(expected)
    })
  })
})
