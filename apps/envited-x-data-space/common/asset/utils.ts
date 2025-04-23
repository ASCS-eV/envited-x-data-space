import { MemoryBlockstore } from 'blockstore-core/memory'
import { importer } from 'ipfs-unixfs-importer'
import {
  any,
  append,
  applySpec,
  assoc,
  concat,
  equals,
  filter,
  find,
  flip,
  groupBy,
  includes,
  is,
  isNil,
  join,
  keys,
  map,
  omit,
  path,
  pathEq,
  pathOr,
  pickAll,
  pipe,
  propEq,
  reduce,
  reject,
  replace,
  startsWith,
  values,
} from 'ramda'

import { extractFromByteArray, stream } from '../archive'
import { IGNORED_SCHEMAS, SCHEMA } from '../schemas'
import { streamToUint8Array } from '../utils'
import {
  MANIFEST_ARTIFACTS,
  MANIFEST_CATEGORY_ID,
  MANIFEST_LICENSE_DATA,
  MANIFEST_LINK_ACCESS_ROLE,
  MANIFEST_LINK_FILE_PATH,
  MANIFEST_LINK_MIME_TYPE,
  MANIFEST_REFERENCE,
} from './constants'
import { AccessRole, ExtractedResource, Manifest, ManifestCategoryId, ManifestLink } from './types'
import { ERRORS } from '../constants'

export const jsonToUint8Array = (json: object): Uint8Array => {
  const jsonString = JSON.stringify(json)
  const buffer = Buffer.from(jsonString)
  return new Uint8Array(buffer)
}

export const extractFileFromArchive = async (array: Uint8Array, path: string) =>
  extractFromByteArray(array, path).then(stream)

export const getDomainMetadataPath = (manifest: Manifest) =>
  pipe(
    pathOr([], MANIFEST_ARTIFACTS),
    find(pathEq(ManifestCategoryId.envitedXIsMetadata, MANIFEST_CATEGORY_ID)),
    pathOr('', MANIFEST_LINK_FILE_PATH),
    replace('./', ''),
  )(manifest)

export const getFilesGroupedByAccessRoles = (manifest: Manifest) => {
  const groupedAssets = pipe(
    getAllManifestLinks,
    groupBy((link: ManifestLink) => pathOr('', MANIFEST_LINK_ACCESS_ROLE)(link)),
  )(manifest)

  return {
    owner: groupedAssets[AccessRole.envitedXIsOwner]
      ? getPathsFromManifestLinks(groupedAssets[AccessRole.envitedXIsOwner])
      : [],
    registeredUser: groupedAssets[AccessRole.envitedXIsRegistered]
      ? getPathsFromManifestLinks(groupedAssets[AccessRole.envitedXIsRegistered])
      : [],
    publicUser: groupedAssets[AccessRole.envitedXIsPublic]
      ? getPathsFromManifestLinks(groupedAssets[AccessRole.envitedXIsPublic])
      : [],
  }
}

export const getAllManifestLinks = (manifest: Manifest) =>
  pipe(
    map((dataPath: string[]) => path(dataPath)(manifest)) as any,
    reduce(
      (acc: any, links: ManifestLink[] | ManifestLink) => (is(Array)(links) ? concat(acc, links) : append(links, acc)),
      [],
    ),
  )([MANIFEST_REFERENCE, MANIFEST_LICENSE_DATA, MANIFEST_ARTIFACTS]) as ManifestLink[]

export const formatManifestLinkPath = replace('./', '')

export const isRemoteUrl = startsWith('https://')
export const isSelfHosted = includes('.envited-x.net')

export const hasRemoteLinks = (manifest: Manifest) =>
  pipe(
    getAllManifestLinks,
    map(
      (link: ManifestLink) =>
        isRemoteUrl(pathOr('', MANIFEST_LINK_FILE_PATH)(link)) &&
        !isSelfHosted(pathOr('', MANIFEST_LINK_FILE_PATH)(link)),
    ),
    (x: boolean[]) => any(equals(true))(x),
  )(manifest)

export const getPathsFromManifestLinks = (links: ManifestLink[]) =>
  pipe(
    map((link: ManifestLink) => {
      const category = path(MANIFEST_CATEGORY_ID)(link) as ManifestCategoryId
      const fileData = !isRemoteUrl(pathOr('', MANIFEST_LINK_FILE_PATH)(link))
        ? {
            path: formatManifestLinkPath(pathOr('', MANIFEST_LINK_FILE_PATH)(link)),
            category: category,
          }
        : null
      if (fileData) {
        const mimeType = pathOr('', MANIFEST_LINK_MIME_TYPE)(link)
        return assoc('mimeType', mimeType)(fileData)
      }

      return fileData
    }),
    reject(isNil),
  )(links) as { path: string; category: ManifestCategoryId; mimeType?: string }[]

export const getAllManifestLinksAndFormatPaths = (manifest: Manifest) =>
  pipe(
    getAllManifestLinks,
    getPathsFromManifestLinks,
    map(({ path }: { path: string }) => path),
  )(manifest)

export const predetermineCID = async (array: Uint8Array) => {
  try {
    const buffer = Buffer.from(array)
    const blockstore = new MemoryBlockstore()

    let rootCid: any

    for await (const result of importer([{ content: buffer }], blockstore, {
      cidVersion: 1,
      rawLeaves: 1 === 1,
    })) {
      rootCid = result.cid
    }

    return rootCid.toString()
  } catch (err) {
    return err
  }
}

export const extractGeneralInformationFromMetadata = (type: string) =>
  applySpec({
    name: path([`${type}:hasDataResource`, 'gx:name', '@value']),
    description: path([`${type}:hasDataResource`, 'gx:description', '@value']),
    formatType: path([`${type}:hasDataResourceExtension`, `${type}:hasFormat`, `${type}:formatType`]),
    version: path([`${type}:hasDataResourceExtension`, `${type}:hasFormat`, `${type}:version`, '@value']),
  })

export const transformDomainMetadata = (jsonData: Record<string, any>) => {
  // Find any hasDataResource and hasDataResourceExtension properties
  const dataResource = Object.entries(jsonData).find(([key]) => key.endsWith(':hasDataResource'))?.[1] as Record<
    string,
    any
  >
  const dataResourceExtension = Object.entries(jsonData).find(([key]) =>
    key.endsWith(':hasDataResourceExtension'),
  )?.[1] as Record<string, any>

  // Extract description and name from DataResource
  const description = dataResource?.['gx:description']?.['@value'] || ''
  const name = dataResource?.['gx:name']?.['@value'] || ''

  // Initialize result object with basic information
  const result: any = {
    description,
    name,
  }

  // Process each property in dataResourceExtension dynamically
  if (dataResourceExtension) {
    Object.keys(dataResourceExtension).forEach(key => {
      if (key.includes(':has')) {
        const node = dataResourceExtension[key]
        if (!node) return

        const typeName = key.split(':has')[1]
        const typePrefix = key.split(':has')[0]
        const fullTypeName = `${typePrefix}:${typeName}`

        // Create an entry for this node
        result[fullTypeName] = {}

        // Copy all properties except @type and @id
        Object.keys(node).forEach(propKey => {
          if (propKey !== '@type' && propKey !== '@id') {
            // Handle complex structures recursively
            result[fullTypeName][propKey] = extractValue(node[propKey])
          }
        })
      }
    })
  }

  return result
}

export const extractValue = (value: any): any => {
  // Base case: not an object or null
  if (!value || typeof value !== 'object') {
    return value
  }

  // If it has @value, return the @value
  if (value['@value'] !== undefined) {
    return value['@value']
  }

  // For arrays, map each element
  if (Array.isArray(value)) {
    return value.map(extractValue)
  }

  // For complex objects, process recursively
  if (Object.keys(value).length > 0) {
    // Skip @type and @id properties
    if (Object.keys(value).length === 1 && (value['@type'] !== undefined || value['@id'] !== undefined)) {
      return value
    }

    const result: any = {}
    Object.keys(value).forEach(key => {
      if (key !== '@type' && key !== '@id') {
        result[key] = extractValue(value[key])
      }
    })
    return result
  }

  return value
}

export const getDomainMetadataSchemas: (context: Record<string, any>) => string[] = pipe(
  omit(IGNORED_SCHEMAS),
  keys as (context: Record<string, any>) => string[],
  flip(pickAll)(SCHEMA) as (context: Record<string, any>) => Record<string, string>,
  values as (context: Record<string, any>) => string[],
)

export const getMediaFiles = filter(propEq('envited-x:isMedia', 'category'))

export const addCIDs = async (assetArchive: Uint8Array, resources: ExtractedResource[]) => {
  const cids = await Promise.all(
    resources.map(async resource => {
      const resourceStream = await extractFileFromArchive(assetArchive, resource.path)
      const arrayBuffer = await streamToUint8Array(resourceStream)
      return predetermineCID(arrayBuffer)
    }),
  )
  return cids.map((cid, index) => ({
    ...resources[index],
    cid,
  }))
}

export const formatFilesErrorMessage = (errors: { error: string }[]) =>
  pipe(
    map(({ error }: { error: string }) => error),
    join(', '),
    (x: string) => `${ERRORS.FILES_NOT_FOUND} - ${x}`,
  )(errors)
  