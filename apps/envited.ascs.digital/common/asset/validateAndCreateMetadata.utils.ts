import { CID } from 'multiformats/cid'
import * as json from 'multiformats/codecs/json'
import { Hasher } from 'multiformats/dist/src/hashes/hasher'
import { sha256 } from 'multiformats/hashes/sha2'
import {
  append,
  concat,
  find,
  groupBy,
  is,
  isNil,
  map,
  path,
  pathOr,
  pipe,
  propEq,
  propOr,
  reduce,
  reject,
  replace,
  startsWith,
} from 'ramda'

import { extractFromByteArray, read } from '../archive'
import { ExtractedFile, Manifest, ManifestLink } from './types'

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
  const { owner, registeredUser, publicUser } = pipe(
    getAllManifestLinks,
    groupBy((link: ManifestLink) => link['manifest:accessRole']),
  )(manifest)

  return {
    owner: owner ? getPathsFromManifestLinks(owner) : [],
    registeredUser: registeredUser ? getPathsFromManifestLinks(registeredUser) : [],
    publicUser: publicUser ? getPathsFromManifestLinks(publicUser) : [],
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
    ['manifest:license', 'manifest:licenseData'],
  ]) as ManifestLink[]

export const formatManifestLinkPath = replace('./', '')

export const isRemoteUrl = startsWith('https://')

export const getPathsFromManifestLinks = (links: ManifestLink[]) =>
  pipe(
    map((link: ManifestLink) =>
      !isRemoteUrl(link['manifest:path']['@value'])
        ? { path: formatManifestLinkPath(link['manifest:path']['@value']), type: link['manifest:type'] }
        : null,
    ),
    reject(isNil),
  )(links) as { path: string; type: string }[]

export const getAllManifestLinksAndFormatPaths = (manifest: Manifest) =>
  pipe(
    getAllManifestLinks,
    getPathsFromManifestLinks,
    map(({ path }: { path: string }) => path),
  )(manifest)

export const _getPathAndBufferFromFile =
  ({
    getFileFromByteArray,
    createFilename,
  }: {
    getFileFromByteArray: (byteArray: Uint8Array, filename: string) => any
    createFilename: (byteArray: Uint8Array) => Promise<string>
  }) =>
  async (byteArray: Uint8Array, path: string, type: string) => ({
    path,
    type,
    buffer: await getFileFromByteArray(byteArray, path),
    cid: await createFilename(byteArray),
  })

export const getPathAndBufferFromFile = _getPathAndBufferFromFile({
  getFileFromByteArray,
  createFilename,
})

export const _getPathsAndBuffersFromByteArray =
  ({
    getPathAndBufferFromFile,
  }: {
    getPathAndBufferFromFile: (byteArray: Uint8Array, path: string, type: string) => Promise<ExtractedFile>
  }) =>
  async (byteArray: Uint8Array, files: { path: string; type: string }[]) => {
    const promises = files.map(({ path, type }: { path: string; type: string }) => getPathAndBufferFromFile(byteArray, path, type))
    console.log('_getPathsAndBuffersFromByteArray - promises', promises)
    const results = await Promise.all(promises)
    console.log('_getPathsAndBuffersFromByteArray - results', results)
    // await Promise.all(
    //   files.map(({ path, type }: { path: string; type: string }) => getPathAndBufferFromFile(byteArray, path, type)),
    // )

    return results
  }

export const getPathsAndBuffersFromByteArray = _getPathsAndBuffersFromByteArray({
  getPathAndBufferFromFile,
})

export const _getFilesAsPathAndByteArrayFromManifest =
  ({
    getPathsAndBuffersFromByteArray,
  }: {
    getPathsAndBuffersFromByteArray: (
      byteArray: Uint8Array,
      files: { path: string; type: string }[],
    ) => Promise<ExtractedFile[]>
  }) =>
  async (byteArray: Uint8Array, manifest: Manifest) => {
    console.log('before getFilesGroupedByAccessRoles')
    const grouped = getFilesGroupedByAccessRoles(manifest)
    const { owner, registeredUser, publicUser } = grouped
    // const { owner, registeredUser, publicUser } = getFilesGroupedByAccessRoles(manifest)
    console.log('after getFilesGroupedByAccessRoles', grouped)

    return {
      owner: await getPathsAndBuffersFromByteArray(byteArray, owner),
      registeredUser: await getPathsAndBuffersFromByteArray(byteArray, registeredUser),
      publicUser: await getPathsAndBuffersFromByteArray(byteArray, publicUser),
    }
  }

export const getFilesAsPathAndByteArrayFromManifest = _getFilesAsPathAndByteArrayFromManifest({
  getPathsAndBuffersFromByteArray,
})
