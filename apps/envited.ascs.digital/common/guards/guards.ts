import { equals, pathOr, prop, propOr } from 'ramda'

import { Role, Session, Asset, User } from '../../common/types'

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

export const isUsersCompanyProfile = isOwnProfile
