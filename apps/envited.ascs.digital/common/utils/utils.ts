import {
  __,
  addIndex,
  all,
  compose,
  concat,
  equals,
  gt,
  head,
  join,
  juxt,
  map,
  pathOr,
  pipe,
  propSatisfies,
  replace,
  tail,
  take,
  takeLast,
  times,
  toUpper,
  when,
} from 'ramda'

export const extractIdFromCredential = pathOr('', ['credentialSubject', 'id'])

export const extractIssuerIdFromCredential = pathOr('', ['issuer'])

export const extractTypeFromCredential = pathOr('', ['credentialSubject', 'type'])

export const slugify = (string: string) =>
  string
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const createRandomString = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  times(() => (result += chars.charAt(Math.floor(Math.random() * chars.length))), length)

  return result
}

export const mapIndexed = addIndex(map)

export const slugToLabel = (x: string) =>
  pipe(replace(/-/g, ' ') as any, juxt([compose(toUpper, head), tail]), join(''))(x)

export const segmentsToPath = (pathNames: string[]) => (index: number) =>
  pipe(take(index), join('/'), concat('/'))(pathNames)

export const allEqual = (x: any) => all(equals(x))

export const allTrue = allEqual(true)

export const getImageUrl = (image: string) => `${process.env.NEXT_PUBLIC_URL || ''}/${image}`

export const extractAddressFromDid = replace('did:pkh:tz:', '')

export const isTrustAnchor = equals(process.env.TRUST_ANCHOR_DID)

export const truncate = (length: number) =>
  when(
    propSatisfies(gt(__, length), 'length'),
    pipe((x: string) => [take(10, x), takeLast(10, x)], join('…')),
  )

export const truncateDID = truncate(20)

export const isServer = () => typeof window === 'undefined'

export const addUrn = (type: string) => (uuid: string) => `urn:${type}:${uuid}`

export const addUrnUuid = addUrn('uuid')
