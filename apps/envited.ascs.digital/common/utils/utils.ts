import {
  addIndex,
  all,
  compose,
  concat,
  equals,
  head,
  join,
  juxt,
  map,
  pathOr,
  pipe,
  replace,
  tail,
  take,
  times,
  toUpper,
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
