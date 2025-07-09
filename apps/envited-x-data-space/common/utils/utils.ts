import {
  __,
  addIndex,
  all,
  any,
  compose,
  concat,
  equals,
  forEach,
  gt,
  head,
  join,
  juxt,
  last,
  map,
  pathOr,
  pipe,
  propSatisfies,
  reduce,
  replace,
  split,
  tail,
  take,
  takeLast,
  times,
  toUpper,
  when,
} from 'ramda'
import { Readable } from 'stream'

import { KEYWORDS } from '../asset/constants'
import { buffer } from 'stream/consumers'

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

export const anyEqual = (x: any) => any(equals(x))

export const allTrue = allEqual(true)

export const anyFalse = anyEqual(false)

export const getImageUrl = (image: string) => `${process.env.NEXT_PUBLIC_URL || ''}/${image}`

export const addDidToAddress = (address: string) => `did:pkh:tz:${address}`

export const extractAddressFromDid = replace('did:pkh:tz:', '')

export const extractUuidFromUrn = replace('urn:uuid:', '')

export const isTrustAnchor = equals(process.env.TRUST_ANCHOR_DID)

export const truncate = (length: number) =>
  when(
    propSatisfies(gt(__, length), 'length'),
    pipe((x: string) => [take(10, x), takeLast(10, x)], join('…')),
  )

export const truncatePkh = truncate(20)

export const truncateCID = truncate(10)

export const isServer = () => typeof window === 'undefined'

export const addUrn = (type: string) => (uuid: string) => `urn:${type}:${uuid}`

export const addUrnUuid = addUrn('uuid')

export const reduceIndexed = addIndex(reduce)

export const formatTokenAttributes = (data: any) => {
  const result = {}

  forEach(({ name, value }) => {
    const keys = name.split(':')

    reduceIndexed(
      (acc: any, key: any, index: any) => {
        if (index === keys.length - 1) {
          acc[key] = value
        } else {
          acc[key] = acc[key] || {}
        }
        return acc[key]
      },
      result,
      keys,
    )
  }, data)

  return result
}

export const formatIpfsUri = (CID: string) => `ipfs://${CID}`

export const formatAssetUri = (CID: string) => `${process.env.ASSETS_URL}/${CID}`

export const formatMetadataUri = (CID: string) => `${process.env.PRIVATE_RESOURCES_URL}/${CID}`

export const extractFilenameFromPath = (path: string) => last(split('/')(path))

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export const capitalize = (string: string) => {
  if (typeof string !== 'string') {
    return string
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const formatSectionName = (name: string): string => {
  if (!name) {
    return ''
  }

  return last(split(':', name)) as string
}

export const formatItemName = (name: string) => {
  if (!name) {
    return ''
  }
  // Add spaces in the following cases:
  // 1. Before capital letters that are at the start of a word or after lowercase
  // 2. Before numbers
  const withSpaces = replace(/([a-z]|^)([A-Z])|([0-9])/g, '$1 $2$3', name)

  // Ensure the first letter is capitalized
  return pipe(
    // Trim leading spaces that might occur
    replace(/^\s+/, ''),
    // Capitalize first letter
    capitalize,
  )(withSpaces)
}

export const displayItemValue = (value: any) =>
  Array.isArray(value)
    ? value.map(item => (typeof item === 'string' ? capitalize(item) : item)).join(', ')
    : typeof value !== 'object' && value !== null
    ? capitalize(value)
    : ''

export const removeKeywords = (str: string): string => {
  return KEYWORDS.reduce((result, keyword) => {
    return result.replace(new RegExp(keyword, 'g'), '')
  }, str)
}

export const getAssetType = (metadata: Record<string, any>) => {
  const type = metadata['@type']

  return split(':', type)[0]
}

export const kebabToCamelCase = (str: string): string => {
  return str
    .split('-')
    .map((word, index) => {
      // Keep the first word lowercase, capitalize the rest
      return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join('')
}

export const handleImageLoadError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.target as HTMLImageElement
  // Prevent infinite loop if fallback also fails
  if (!target.src.includes('/ASCS_logo_envited-X_colour_alex.png')) {
    target.src = '/ASCS_logo_envited-X_colour_alex.png'
    // Apply styling to center the image at 50% size and opacity
    target.style.objectFit = 'contain'
    target.style.maxWidth = '50%'
    target.style.maxHeight = '50%'
    target.style.opacity = '0.5'
  }
}

export const extractContentFromStream = async (stream: Readable) => {
  let dataString = ''
  for await (const chunk of stream) {
    dataString += chunk.toString()
  }
  return dataString
}

export const streamToUint8Array = async (stream: Readable) => {
  const chunks: Uint8Array[] = []
  for await (const chunk of stream) {
    chunks.push(chunk)
  }
  return new Uint8Array(Buffer.concat(chunks))
}

export const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  return await buffer(stream)
}

export const fileToUint8Array = async (file: File): Promise<Uint8Array> => {
  const arrayBuffer = await file.arrayBuffer()
  return new Uint8Array(arrayBuffer)
}

export const stringToStream = (str: string) =>
  new Readable({
    read() {
      this.push(str)
      this.push(null)
    },
  })

export const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'
