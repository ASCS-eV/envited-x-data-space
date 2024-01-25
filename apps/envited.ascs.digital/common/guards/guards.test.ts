import { USER_CREDENTIAL } from '../../common/fixtures'
import { Session, User } from '../types'
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
})
