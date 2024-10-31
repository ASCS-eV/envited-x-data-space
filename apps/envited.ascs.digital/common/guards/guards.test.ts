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

  describe('isPrincipalContact', () => {
    it('should check if logged in user is a principal', () => {
      // when ... we want to check if the user has the principal
      const session = {
        user: {
          pkh: 'USER_ID',
        },
      } as Session

      const profile = {
        principalUserId: 'USER_ID',
      }
      // then ... we should get the result as expected
      const result = SUT.isPrincipalContact(session)(profile)

      expect(result).toEqual(true)
    })
  })

  describe('isOwnAsset', () => {
    it('should check if the profile to be updated is the profile of the logged in user', () => {
      // when ... we want to check if the asset is owned by the logged in user
      const asset = {
        id: 'ASSET_ID',
        cid: 'ASSET_CID',
        userId: 'PKH',
      } as any

      const session = {
        user: {
          pkh: 'PKH',
        },
      } as any
      // then ... we should get the result as expected
      const result = SUT.isOwnAsset(asset)(session)

      expect(result).toEqual(true)
    })
  })

  describe('isOwnProfile', () => {
    it('should check if the profile to be updated is the profile of the logged in user', () => {
      // when ... we want to check if the profile is owned by the logged in user
      const user = {
        id: 'PKH',
        name: 'NAME',
        profile: {
          name: 'NAME',
        },
      } as any

      const profile = {
        name: 'NAME',
      } as any
      // then ... we should get the result as expected
      const result = SUT.isOwnProfile(user)(profile)

      expect(result).toEqual(true)
    })
  })

  describe('isUsersCompanyProfile', () => {
    it('should check if the requested profile is the profile of the logged in users company', () => {
      // when ... we want to check if the requested profile is owned by the logged in users company
      // then ... we should get the result as expected
      const principal = {
        id: 'PKH',
        name: 'NAME',
        profile: {
          name: 'NAME',
        },
      } as any

      const profile = {
        name: 'NAME',
      } as any
      const result = SUT.isUsersCompanyProfile(principal)(profile)

      expect(result).toEqual(true)
    })
  })

  describe('hasCredentialType', () => {
    it('should check if role exist', () => {
      // when ... we want to check if we have a credential type
      // then ... we should get the result as expected
      const credentialTypes = [
        {
          credentialType: {
            name: 'TYPE',
          },
        },
        {
          credentialType: {
            name: 'TYPE 1',
          },
        },
      ] as any
      const result = SUT.hasCredentialType('TYPE 1')(credentialTypes)

      expect(result).toEqual(true)
    })
  })

  describe('hasRole', () => {
    it('should check if role exist', () => {
      // when ... we want to check if a role exists
      // then ... we should get the result as expected
      const roles = [
        {
          userId: 'USER_ID',
          roleId: Role.federator,
        },
        {
          userId: 'USER_ID',
          roleId: Role.user,
        },
        {
          userId: 'USER_ID',
          roleId: Role.principal,
        },
        {
          userId: 'USER_ID',
          roleId: Role.provider,
        },
      ] as any
      const result = SUT.hasRole(Role.federator)(roles)

      expect(result).toEqual(true)
    })
  })
})
