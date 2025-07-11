import { all, and, compose, equals, find, includes, prop, propEq, propOr } from 'ramda'

import { db } from '../database/queries'
import { Database } from '../database/types'
import { Log, log } from '../logger'
import { SCHEMA } from '../schemas'
import { extractContentFromStream, formatAssetUri } from '../utils'
import { formatError, internalServerErrorError } from '../utils'
import { streamToBuffer, stringToStream } from '../utils/utils'
import { validateShacl } from '../validator/shacl'
import { MANIFEST_FILE, README_FILE } from './constants'
import { AccessLevel, ExtractedResourceWithCID, Manifest, ManifestCategoryId } from './types'
import {
  extractFileFromArchive,
  getDomainMetadataPath,
  getDomainMetadataSchemas,
  getFilesGroupedByAccessRoles,
  jsonToUint8Array,
  predetermineCID,
} from './utils'

export const _getAssetResourcesByAssetId =
  ({ db, log }: { db: Database; log: Log }) =>
  async (assetId: string) => {
    try {
      const connection = await db()
      const [result] = await connection.getAssetResourcesByAssetId(assetId)

      return result
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getAsset = _getAssetResourcesByAssetId({ db, log })

export const _getAssetResourcesByAssetIdAndAccessLevel =
  ({ db, log }: { db: Database; log: Log }) =>
  async (assetId: string, accessLevel: AccessLevel) => {
    try {
      const connection = await db()
      const [result] = await connection.getAssetResourcesByAssetIdAndAccessLevel({ assetId, accessLevel })

      return result
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getAssetResourcesByAssetIdAndAccessLevel = _getAssetResourcesByAssetIdAndAccessLevel({ db, log })

export const _insertAssetResource =
  ({ db, log }: { db: Database; log: Log }) =>
  async ({
    assetId,
    name,
    cid,
    mimeType,
    accessLevel,
  }: {
    assetId: string
    name: string
    cid: string
    mimeType: string
    accessLevel: AccessLevel
  }) => {
    try {
      const connection = await db()
      const [result] = await connection.insertAssetResource({ assetId, name, cid, mimeType, accessLevel })

      return result
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const insertAssetResource = _insertAssetResource({ db, log })

export const _deleteAssetResource =
  ({ db, log }: { db: Database; log: Log }) =>
  async (assetId: string, name: string) => {
    try {
      const connection = await db()
      const [result] = await connection.deleteAssetResource({ assetId, name })

      return result
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const deleteAssetResource = _deleteAssetResource({ db, log })

export const extractManifest = async (assetArchive: Uint8Array) => {
  const manifestStream = await extractFileFromArchive(assetArchive, MANIFEST_FILE)
  const manifest = await extractContentFromStream(manifestStream).then(JSON.parse)
  const manifestSchemaStream = stringToStream(SCHEMA.manifest)
  const { conforms, report } = await validateShacl(manifestSchemaStream)(manifestStream)
  const manifestArrayBuffer = await jsonToUint8Array(manifest)
  const cid = await predetermineCID(manifestArrayBuffer)

  return { conforms, report, data: manifest, cid, fileSize: manifestArrayBuffer.byteLength }
}

export const extractDomainMetadata = async (assetArchive: Uint8Array, manifest: Manifest) => {
  const domainMetadataPath = getDomainMetadataPath(manifest)
  const domainMetadataStream = await extractFileFromArchive(assetArchive, domainMetadataPath)
  const domainMetadata = await extractContentFromStream(domainMetadataStream).then(JSON.parse)
  const schemas = getDomainMetadataSchemas(domainMetadata['@context'])
  const validationsPromises = schemas.map(schema => validateShacl(stringToStream(schema))(domainMetadataStream))
  const validationsResults = await Promise.all(validationsPromises)
  const domainMetadataArrayBuffer = await jsonToUint8Array(domainMetadata)
  const cid = await predetermineCID(domainMetadataArrayBuffer)

  return {
    conforms: all(x => equals(true)(prop('conforms')(x)), validationsResults),
    report: validationsResults,
    data: domainMetadata,
    cid,
    fileSize: domainMetadataArrayBuffer.byteLength,
  }
}

export const extractResources = getFilesGroupedByAccessRoles

export const extractReadme = async (assetArchive: Uint8Array) => {
  try {
    const readmeStream = await extractFileFromArchive(assetArchive, README_FILE)

    return await extractContentFromStream(readmeStream)
  } catch (error) {
    return null
  }
}

export const getCoverImage = async (assetArchive: Uint8Array, media: ExtractedResourceWithCID[]) => {
  const coverImage = find(
    and(propEq(ManifestCategoryId.envitedXIsMedia, 'category'), compose(includes('image'), propOr('', 'mimeType'))),
  )(media) as ExtractedResourceWithCID
  const coverImageStream = await extractFileFromArchive(assetArchive, coverImage.path)

  return {
    cid: coverImage.cid,
    fileSize: (await streamToBuffer(coverImageStream)).byteLength,
    uri: `${formatAssetUri(coverImage.cid)}${coverImage.path}`,
  }
}
