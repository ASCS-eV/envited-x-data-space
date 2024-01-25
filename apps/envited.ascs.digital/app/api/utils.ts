import { equals, pathOr, prop } from 'ramda'

import { Role, Session, User } from '../../common/types/types'


export const extractIdFromCredential = pathOr('', ['credentialSubject', 'id'])

export const extractIssuerIdFromCredential = pathOr('', ['issuer', 'id'])

export const extractTypeFromCredential = pathOr('', ['credentialSubject', 'type'])
