import { hasRole } from '../guards'
import { Role } from '../types'

export const assignSingleRole = (roles: { userId: string; roleId: Role }[]) => {
  if (hasRole(Role.federator)(roles)) {
    return Role.federator
  }

  if (hasRole(Role.principal)(roles)) {
    return Role.principal
  }

  if (hasRole(Role.provider)(roles)) {
    return Role.provider
  }

  if (hasRole(Role.user)(roles)) {
    return Role.user
  }

  return null
}
