import { equals, pathOr, prop } from 'ramda'

import { Session, User } from '../../common/types/types'

export const extractIdFromCredential = pathOr('', ['credentialSubject', 'id'])

export const extractIssuerIdFromCredential = pathOr('', ['issuer', 'id'])

export const extractTypeFromCredential = pathOr('', ['credentialSubject', 'type'])

export const isOwnUser = (user: User) => (session: Session) =>
  equals(prop('id')(user))(pathOr('', ['user', 'pkh'])(session))

export const userIsIssuedByLoggedInUser = (user: User) => (session: Session) =>
  equals(prop('issuerId')(user))(pathOr('', ['user', 'pkh'])(session))
