import { Role } from '../types'
import * as SUT from './roles'

describe('common/roles', () => {
  describe('assignSingleRole', () => {
    it('should return the highest role', () => {
      // when ... we want to get the highest role of a user
      // then ... we should get the highest role
      const roles = [
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
      const result = SUT.assignSingleRole(roles)

      expect(result).toEqual(Role.principal)
    })
  })
})
