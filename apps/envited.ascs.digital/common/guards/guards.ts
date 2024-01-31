import { equals, path, pathOr, prop } from 'ramda'

import { Role, Session, User } from '../../common/types/types'

export const isFederator = (session: Session) => equals(Role.federator)(pathOr('' as Role, ['user', 'role'])(session))

export const isPrincipal = (session: Session) => equals(Role.principal)(pathOr('' as Role, ['user', 'role'])(session))

export const isOwnUser = (user: User) => (session: Session) =>
  equals(prop('id')(user))(pathOr('', ['user', 'pkh'])(session))

export const userIsIssuedByLoggedInUser = (user: User) => (session: Session) =>
  equals(prop('issuerId')(user))(pathOr('', ['user', 'pkh'])(session))

export const isOwnProfile = (user: User) => (profile: { name: string }) =>
  equals(path(['profile', 'name'])(user))(prop('name')(profile))

export const isUsersCompanyProfile = (principal: User) => (profile: { name: string }) =>
  equals(prop('name')(principal))(prop('name')(profile))
