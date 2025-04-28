import { MemoryBlockstore } from 'blockstore-core/memory'
import { importer } from 'ipfs-unixfs-importer'
import { CID } from 'multiformats/cid'
import * as raw from 'multiformats/codecs/raw'
import { Hasher } from 'multiformats/dist/src/hashes/hasher'
import { sha256 } from 'multiformats/hashes/sha2'
import {
  any,
  append,
  applySpec,
  assoc,
  concat,
  equals,
  find,
  groupBy,
  includes,
  is,
  isNil,
  map,
  path,
  pathEq,
  pathOr,
  pipe,
  prop,
  reduce,
  reject,
  replace,
  startsWith,
} from 'ramda'

import { extractFromByteArray, read } from '../archive'
import { getFileBlob } from '../archive/archive'
import {
  MANIFEST_ARTIFACTS,
  MANIFEST_CATEGORY_ID,
  MANIFEST_LICENSE_DATA,
  MANIFEST_LINK_ACCESS_ROLE,
  MANIFEST_LINK_FILE_PATH,
  MANIFEST_LINK_MIME_TYPE,
  MANIFEST_REFERENCE,
} from './constants'
import { AccessRole, ExtractedFile, ExtractedFileWithCID, Manifest, ManifestCategoryId, ManifestLink } from './types'

export const _createFilename =
  ({ raw, sha256, CID }: { raw: any; sha256: Hasher<'sha2-256', 18>; CID: any }) =>
  async (byteArray: Uint8Array) => {
    try {
      const rawBytes = raw.encode(byteArray)
      const hash = await sha256.digest(rawBytes)
      const cid = CID.create(1, raw.code, hash)

      return cid.toString()
    } catch (error: unknown) {
      console.log(error)
    }
  }

export const createFilename = _createFilename({
  raw,
  sha256,
  CID,
})

export const jsonToUint8Array = (json: object): Uint8Array => {
  const jsonString = JSON.stringify(json)
  const buffer = Buffer.from(jsonString)
  return new Uint8Array(buffer)
}

export const getFileFromByteArray = async (byteArray: Uint8Array, filename: string) =>
  extractFromByteArray(byteArray, filename).then(read)

export const getArrayBufferFromByteArray = async (byteArray: Uint8Array, filename: string) => {
  const extractedFile = await extractFromByteArray(byteArray, filename)
  const blob = await getFileBlob(extractedFile)

  return blob.arrayBuffer()
}

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

export const hasManifestThirdPartyLinks = (manifest: Manifest) =>
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

export const _getPathAndBufferFromFile =
  ({
    getArrayBufferFromByteArray,
  }: {
    getArrayBufferFromByteArray: (byteArray: Uint8Array, filename: string) => Promise<ArrayBuffer>
  }) =>
  async (byteArray: Uint8Array, path: string, category: ManifestCategoryId, mimeType?: string) => ({
    path,
    category,
    arrayBuffer: await getArrayBufferFromByteArray(byteArray, path),
    mimeType: mimeType || '',
  })

export const getPathAndBufferFromFile = _getPathAndBufferFromFile({
  getArrayBufferFromByteArray,
})

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

export const _getFilenameFromFile =
  ({ predetermineCID }: { predetermineCID: (byteArray: Uint8Array) => Promise<string> }) =>
  async (
    path: string,
    category: ManifestCategoryId,
    arrayBuffer: ArrayBuffer,
    mimeType: string,
  ): Promise<ExtractedFileWithCID> => {
    const cid = await predetermineCID(new Uint8Array(arrayBuffer))
    return {
      cid,
      path,
      category,
      arrayBuffer,
      mimeType,
    }
  }

export const getFilenameFromFile = _getFilenameFromFile({
  predetermineCID,
})

export const _getAllFilenamesFromFiles =
  ({
    getFilenameFromFile,
  }: {
    getFilenameFromFile: (
      path: string,
      category: ManifestCategoryId,
      arrayBuffer: ArrayBuffer,
      mimeType: string,
    ) => Promise<ExtractedFileWithCID>
  }) =>
  async (files: { path: string; category: ManifestCategoryId; arrayBuffer: ArrayBuffer; mimeType: string }[]) =>
    await Promise.all(
      files.map(
        ({
          path,
          category,
          arrayBuffer,
          mimeType,
        }: {
          path: string
          category: ManifestCategoryId
          arrayBuffer: ArrayBuffer
          mimeType: string
        }) => getFilenameFromFile(path, category, arrayBuffer, mimeType),
      ),
    )

export const getAllFilenamesFromFiles = _getAllFilenamesFromFiles({
  getFilenameFromFile,
})

export const _getPathsAndBuffersFromByteArray =
  ({
    getPathAndBufferFromFile,
  }: {
    getPathAndBufferFromFile: (
      byteArray: Uint8Array,
      path: string,
      category: ManifestCategoryId,
      mimeType?: string,
    ) => Promise<ExtractedFile>
  }) =>
  async (byteArray: Uint8Array, files: { path: string; category: ManifestCategoryId; mimeType?: string }[]) =>
    await Promise.all(
      files.map(({ path, category, mimeType }: { path: string; category: ManifestCategoryId; mimeType?: string }) =>
        getPathAndBufferFromFile(byteArray, path, category, mimeType),
      ),
    )

export const getPathsAndBuffersFromByteArray = _getPathsAndBuffersFromByteArray({
  getPathAndBufferFromFile,
})

export const _getFilesAsPathAndByteArrayFromManifest =
  ({
    getPathsAndBuffersFromByteArray,
  }: {
    getPathsAndBuffersFromByteArray: (
      byteArray: Uint8Array,
      files: { path: string; category: ManifestCategoryId; mimeType?: string }[],
    ) => Promise<ExtractedFile[]>
  }) =>
  async (byteArray: Uint8Array, manifest: Manifest) => {
    const { owner, registeredUser, publicUser } = getFilesGroupedByAccessRoles(manifest)

    return {
      owner: await getPathsAndBuffersFromByteArray(byteArray, owner),
      registeredUser: await getPathsAndBuffersFromByteArray(byteArray, registeredUser),
      publicUser: await getPathsAndBuffersFromByteArray(byteArray, publicUser),
    }
  }

export const getFilesAsPathAndByteArrayFromManifest = _getFilesAsPathAndByteArrayFromManifest({
  getPathsAndBuffersFromByteArray,
})

export const extractGeneralInformationFromMetadata = (type: string) =>
  applySpec({
    name: path([`${type}:hasDataResource`, 'gx:name', '@value']),
    description: path([`${type}:hasDataResource`, 'gx:description', '@value']),
    formatType: path([`${type}:hasDataResourceExtension`, `${type}:hasFormat`, `${type}:formatType`]),
    version: path([`${type}:hasDataResourceExtension`, `${type}:hasFormat`, `${type}:version`, '@value']),
  })

export const extractReferencedArtifactsFromManifest = prop('manifest:hasReferencedArtifacts')

export const extractDomainMetadata = (jsonData: Record<string, any>) => {
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
