import { CID } from 'multiformats/cid'
import * as raw from 'multiformats/codecs/raw'
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
  reduce,
  reject,
  replace,
  startsWith,
} from 'ramda'

import { extractFromByteArray, read } from '../archive'
import { ExtractedFileWithCID, Manifest, ManifestLink } from './types'
import { readBuffer } from '../archive/archive'

export const _createFilename =
  ({ raw, sha256, CID }: { raw: any; sha256: Hasher<'sha2-256', 18>; CID: any }) =>
  async (byteArray: any) => {
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

export const getFileFromByteArray = async (byteArray: Uint8Array, filename: string) => {
  const extractedFile = await extractFromByteArray(byteArray, filename)
  console.log('getFileFromByteArray - typeof', typeof extractedFile)
  console.log('getFileFromByteArray', extractedFile)

  const fileBuffer = await readBuffer(extractedFile)
  console.log('getFileFromByteArray - fileBuffer', fileBuffer)

  return extractFromByteArray(byteArray, filename).then(read)
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
  ({ getFileFromByteArray }: { getFileFromByteArray: (byteArray: Uint8Array, filename: string) => Promise<string> }) =>
  async (byteArray: Uint8Array, path: string, type: string) => {
    const fileString = await getFileFromByteArray(byteArray, path)

    return {
      path,
      type,
      buffer: Buffer.from(fileString),
    }
  }

export const getPathAndBufferFromFile = _getPathAndBufferFromFile({
  getFileFromByteArray,
})

export const _getFilenameFromFile =
  ({ createFilename }: { createFilename: (byteArray: Uint8Array) => Promise<string> }) =>
  async (path: string, type: string, buffer: Buffer): Promise<ExtractedFileWithCID> => {
    console.log({ path, type, buffer }, typeof buffer)
    return {
      cid: await createFilename(buffer),
      path,
      type,
      buffer,
    }
  }

export const getFilenameFromFile = _getFilenameFromFile({
  createFilename,
})

export const _getAllFilenamesFromFiles =
  ({
    getFilenameFromFile,
  }: {
    getFilenameFromFile: (path: string, type: string, buffer: Buffer) => Promise<ExtractedFileWithCID>
  }) =>
  async (files: { path: string; type: string; buffer: Buffer }[]) =>
    await Promise.all(
      files.map(({ path, type, buffer }: { path: string; type: string; buffer: Buffer }) =>
        getFilenameFromFile(path, type, buffer),
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
    ) => Promise<{ path: string; type: string; buffer: Buffer }>
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
    ) => Promise<{ path: string; type: string; buffer: Buffer }[]>
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
