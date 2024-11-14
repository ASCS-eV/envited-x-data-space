import { CID } from 'multiformats/cid'
import * as json from 'multiformats/codecs/json'
import { Hasher } from 'multiformats/dist/src/hashes/hasher'
import { sha256 } from 'multiformats/hashes/sha2'
import { append, concat, find, groupBy, is, map, path, pathOr, pipe, propEq, propOr, reduce, replace } from 'ramda'

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
    owner: getPathsFromManifestLinks(propOr([], 'owner')(files)),
    registeredUser: getPathsFromManifestLinks(propOr([], 'registeredUser')(files)),
    publicUser: getPathsFromManifestLinks(propOr([], 'publicUser')(files)),
  }
}

export const getAllManifestLinks = (manifest: Manifest) =>
  pipe(
    map((dataPath: string[]) => path(dataPath)(manifest)) as any,
    reduce(
      (acc: any, links: ManifestLink[] | ManifestLink) => (is(Array)(links) ? concat(acc, links) : append(links, acc)),
      [],
    ),
  )([
    ['manifest:data', 'manifest:assetData'],
    ['manifest:data', 'manifest:contentData'],
  ]) as ManifestLink[]

export const formatManifestLinkPath = replace('./', '')

export const getPathsFromManifestLinks = (links: ManifestLink[]) =>
  map((link: ManifestLink) => formatManifestLinkPath(link['manifest:path']['@value']))(links)

export const getAllManifestLinksAndFormatPaths = (manifest: Manifest) =>
  pipe(getAllManifestLinks, getPathsFromManifestLinks)(manifest)

export const _getPathAndBufferFromFile =
  ({ getFileFromByteArray }: { getFileFromByteArray: (byteArray: Uint8Array, filename: string) => any }) =>
  async (byteArray: Uint8Array, path: string) => ({
    path,
    buffer: await getFileFromByteArray(byteArray, path),
  })

export const getPathAndBufferFromFile = _getPathAndBufferFromFile({
  getFileFromByteArray,
})

export const _getPathsAndBuffersFromByteArray =
  ({
    getPathAndBufferFromFile,
  }: {
    getPathAndBufferFromFile: (byteArray: Uint8Array, path: string) => Promise<{ path: string; buffer: Uint8Array }>
  }) =>
  async (byteArray: Uint8Array, files: string[]) =>
    await Promise.all(files.map((path: string) => getPathAndBufferFromFile(byteArray, path)))

export const getPathsAndBuffersFromByteArray = _getPathsAndBuffersFromByteArray({
  getPathAndBufferFromFile,
})

export const _getFilesAsPathAndByteArrayFromManifest =
  ({
    getPathsAndBuffersFromByteArray,
  }: {
    getPathsAndBuffersFromByteArray: (
      byteArray: Uint8Array,
      files: string[],
    ) => Promise<{ path: string; buffer: Uint8Array }[]>
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
