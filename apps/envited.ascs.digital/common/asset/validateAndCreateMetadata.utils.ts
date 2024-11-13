import { CID } from 'multiformats/cid'
import * as json from 'multiformats/codecs/json'
import { Hasher } from 'multiformats/dist/src/hashes/hasher'
import { sha256 } from 'multiformats/hashes/sha2'
import { find, groupBy, map, path, pathOr, pipe, propEq, propOr, replace } from 'ramda'

import { extractFromByteArray, read } from '../archive'
import { Manifest, ManifestLink } from './types'

export const _createFilename =
  ({ json, sha256, CID }: { json: any; sha256: Hasher<'sha2-256', 18>; CID: any }) =>
  async (byteArray: any) => {
    try {
      const jsonBytes = json.encode(byteArray)
      const hash = await sha256.digest(jsonBytes)
      const cid = CID.create(1, json.code, hash)

      return cid.toString()
    } catch (error: unknown) {
      console.log(error)
    }
  }

export const createFilename = _createFilename({
  json,
  sha256,
  CID,
})

export const getFileFromByteArray = async (byteArray: Uint8Array, filename: string) =>
  extractFromByteArray(byteArray, filename).then(read)

export const getDomainMetadataPath = (manifest: Manifest) =>
  pipe(
    pathOr([], ['manifest:data', 'manifest:contentData']),
    find(propEq('metadata', 'manifest:type')),
    pathOr('', ['manifest:path', '@value']),
    replace('./', ''),
  )(manifest)

export const getFilesGroupedByAccessRoles = (manifest: Manifest) => {
  const files = pipe(
    getAllManifestLinks,
    groupBy((link: ManifestLink) => link['manifest:accessRole']),
  )(manifest)

  return {
    owner: getPathsOfManifestFiles(propOr([], 'owner')(files)),
    registeredUser: getPathsOfManifestFiles(propOr([], 'registeredUser')(files)),
    publicUser: getPathsOfManifestFiles(propOr([], 'publicUser')(files)),
  }
}

export const getAllManifestLinks = (manifest: Manifest) => {
  const assetData = path(['manifest:data', 'manifest:assetData'])(manifest) as ManifestLink[]
  const contentData = path(['manifest:data', 'manifest:contentData'])(manifest) as ManifestLink[]

  return [...assetData, ...contentData]
}

export const formatManifestLinkPath = replace('./', '')

export const getPathsOfManifestFiles = (links: ManifestLink[]) =>
  map((link: ManifestLink) => formatManifestLinkPath(link['manifest:path']['@value']))(links)

export const getManifestFilesAndFormatPaths = (manifest: Manifest) =>
  pipe(getAllManifestLinks, getPathsOfManifestFiles)(manifest)

export const _getFileWithPathAndBuffer =
  ({ getFileFromByteArray }: { getFileFromByteArray: (byteArray: Uint8Array, filename: string) => any }) =>
  async (byteArray: Uint8Array, path: string) => ({
    path,
    buffer: await getFileFromByteArray(byteArray, path),
  })

export const getFileWithPathAndBuffer = _getFileWithPathAndBuffer({
  getFileFromByteArray,
})

export const _getFilesFromByteArray =
  ({
    getFileWithPathAndBuffer,
  }: {
    getFileWithPathAndBuffer: (byteArray: Uint8Array, path: string) => Promise<{ path: string; buffer: Uint8Array }>
  }) =>
  async (byteArray: Uint8Array, files: string[]) =>
    await Promise.all(files.map((path: string) => getFileWithPathAndBuffer(byteArray, path)))

export const getFilesFromByteArray = _getFilesFromByteArray({
  getFileWithPathAndBuffer,
})

export const _getFilesWithPathAndByteArrayFromManifest =
  ({
    getFilesFromByteArray,
  }: {
    getFilesFromByteArray: (byteArray: Uint8Array, files: string[]) => Promise<{ path: string; buffer: Uint8Array }[]>
  }) =>
  async (byteArray: Uint8Array, manifest: Manifest) => {
    const { owner, registeredUser, publicUser } = getFilesGroupedByAccessRoles(manifest)

    return {
      owner: await getFilesFromByteArray(byteArray, owner),
      registeredUser: await getFilesFromByteArray(byteArray, registeredUser),
      publicUser: await getFilesFromByteArray(byteArray, publicUser),
    }
  }

export const getFilesWithPathAndByteArrayFromManifest = _getFilesWithPathAndByteArrayFromManifest({
  getFilesFromByteArray,
})
