import { equals, find, isNil, pathEq, pathOr, prop, propEq, propOr } from 'ramda'

import { Asset, Role, Session, User } from '../../common/types'

export const isFederator = (session: Session) => equals(Role.federator)(pathOr('' as Role, ['user', 'role'])(session))

export const isPrincipal = (session: Session) => equals(Role.principal)(pathOr('' as Role, ['user', 'role'])(session))

export const isOwnAsset = (asset: Asset) => (session: Session) =>
  equals(prop('userId')(asset))(pathOr('', ['user', 'pkh'])(session))

export const isOwnUser = (user: User) => (session: Session) =>
  equals(prop('id')(user))(pathOr('', ['user', 'pkh'])(session))

export const userIsIssuedByLoggedInUser = (user: User) => (session: Session) =>
  equals(prop('issuerId')(user))(pathOr('', ['user', 'pkh'])(session))

export const isOwnProfile = (user: User) => (profile: { name?: string }) =>
  equals(prop('name')(user))(propOr('', 'name')(profile))

export const isPrincipalContact = (session: Session) => (profile: { principalUserId?: string }) =>
  equals(pathOr('', ['user', 'pkh'])(session))(propOr('', 'principalUserId')(profile))

export const isUsersCompanyProfile = isOwnProfile

export const hasCredentialType = (type: string) => (credentialTypes: { credentialType: { name: string } }[]) =>
  !isNil(find(pathEq(type, ['credentialType', 'name']))(credentialTypes))

export const hasRole = (role: Role) => (roles: { userId: string; roleId: Role }[]) =>
  !isNil(find(propEq(role, 'roleId'))(roles))
