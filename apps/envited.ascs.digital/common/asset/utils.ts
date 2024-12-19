import { CID } from 'multiformats/cid'
import * as raw from 'multiformats/codecs/raw'
import { Hasher } from 'multiformats/dist/src/hashes/hasher'
import { sha256 } from 'multiformats/hashes/sha2'
import {
  any,
  append,
  concat,
  equals,
  find,
  groupBy,
  includes,
  is,
  isNil,
  map,
  path,
  pathOr,
  pipe,
  propEq,
  reduce,
  reject,
  replace,
  startsWith,
} from 'ramda'

import { extractFromByteArray, read } from '../archive'
import { getFileBlob } from '../archive/archive'
import { ExtractedFileWithCID, Manifest, ManifestLink } from './types'

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
export const isSelfHosted = includes('.envited-x.net')

export const hasManifestThirdPartyLinks = (manifest: Manifest) =>
  pipe(
    getAllManifestLinks,
    map(
      (link: ManifestLink) =>
        isRemoteUrl(link['manifest:path']['@value']) && !isSelfHosted(link['manifest:path']['@value']),
    ),
    (x: boolean[]) => any(equals(true))(x),
  )(manifest)

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
    getArrayBufferFromByteArray,
  }: {
    getArrayBufferFromByteArray: (byteArray: Uint8Array, filename: string) => Promise<ArrayBuffer>
  }) =>
  async (byteArray: Uint8Array, path: string, type: string) => ({
    path,
    type,
    arrayBuffer: await getArrayBufferFromByteArray(byteArray, path),
  })

export const getPathAndBufferFromFile = _getPathAndBufferFromFile({
  getArrayBufferFromByteArray,
})

export const _getFilenameFromFile =
  ({ createFilename }: { createFilename: (byteArray: Uint8Array) => Promise<string> }) =>
  async (path: string, type: string, arrayBuffer: ArrayBuffer): Promise<ExtractedFileWithCID> => ({
    cid: await createFilename(new Uint8Array(arrayBuffer)),
    path,
    type,
    arrayBuffer,
  })

export const getFilenameFromFile = _getFilenameFromFile({
  createFilename,
})

export const _getAllFilenamesFromFiles =
  ({
    getFilenameFromFile,
  }: {
    getFilenameFromFile: (path: string, type: string, arrayBuffer: ArrayBuffer) => Promise<ExtractedFileWithCID>
  }) =>
  async (files: { path: string; type: string; arrayBuffer: ArrayBuffer }[]) =>
    await Promise.all(
      files.map(({ path, type, arrayBuffer }: { path: string; type: string; arrayBuffer: ArrayBuffer }) =>
        getFilenameFromFile(path, type, arrayBuffer),
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
      type: string,
    ) => Promise<{ path: string; type: string; arrayBuffer: ArrayBuffer }>
  }) =>
  async (byteArray: Uint8Array, files: { path: string; type: string }[]) =>
    await Promise.all(
      files.map(({ path, type }: { path: string; type: string }) => getPathAndBufferFromFile(byteArray, path, type)),
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
      files: { path: string; type: string }[],
    ) => Promise<{ path: string; type: string; arrayBuffer: ArrayBuffer }[]>
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
