import { pathOr } from 'ramda'

export const extractIdFromCredential = pathOr('', ['credentialSubject', 'id'])

export const extractIssuerIdFromCredential = pathOr('', ['issuer', 'id'])

export const extractTypeFromCredential = pathOr('', ['credentialSubject', 'type'])

export const slugify = (string: string) =>
  string
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
