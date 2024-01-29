import { pathOr } from 'ramda'

export const extractIdFromCredential = pathOr('', ['credentialSubject', 'id'])

export const extractIssuerIdFromCredential = pathOr('', ['issuer', 'id'])

export const extractTypeFromCredential = pathOr('', ['credentialSubject', 'type'])
