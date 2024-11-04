import { fileTypeFromBuffer } from 'file-type'
import {
  allPass,
  chain,
  complement,
  filter,
  has,
  head,
  is,
  map,
  pipe,
  prop,
  propEq,
  propSatisfies,
  replace,
  startsWith,
  test,
  toPairs,
} from 'ramda'

export const convertIpfsUrlToGateway = (ipfsUrl: string, gateway = 'https://ipfs.io') => {
  if (startsWith('ipfs://')(ipfsUrl)) {
    return { url: replace('ipfs://', `${gateway}/ipfs/`)(ipfsUrl), filename: replace('ipfs://', '')(ipfsUrl) }
  }

  return { url: ipfsUrl, filename: '' }
}

export const getFileTypeFromBuffer = fileTypeFromBuffer

export const extractAttributesUri = pipe(
  filter(allPass([propEq('application/json', 'type'), complement(propSatisfies(test(/manifest$/), 'name'))])),
  map((x: any) => prop('value')(x)),
  head,
)

// @ts-expect-error - ramda typing
export const extractKeyValuePairs = (obj, parentKey = '') => {
  return pipe(
    // @ts-expect-error - ramda typing
    toPairs, // Convert the object into key-value pairs
    // @ts-expect-error - ramda typing
    chain(([key, value]) => {
      // @ts-expect-error - ramda typing
      const newKey = parentKey ? `${parentKey}:${key}` : key

      // If the value is an object, recursively extract further
      if (is(Object, value) && !has('@value', value)) {
        // @ts-expect-error - ramda typing
        return extractKeyValuePairs(value, newKey)
      }

      // If '@value' exists, return a key-value pair
      if (has('@value', value)) {
        return [{ name: newKey, value: value['@value'] }]
      }

      return []
    }),
  )(obj)
}
