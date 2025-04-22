import { all, and, compose, equals, find, includes, prop, propEq, propOr } from 'ramda'

import { SCHEMA } from '../schemas'
import { extractContentFromStream, formatAssetUri, streamToUint8Array } from '../utils'
import { validateShacl } from '../validator/shacl'
import { MANIFEST_FILE, README_FILE } from './constants'
import { ExtractedResourceWithCID, Manifest, ManifestCategoryId } from './types'
import {
  extractFileFromArchive,
  getDomainMetadataPath,
  getDomainMetadataSchemas,
  getFilesGroupedByAccessRoles,
  jsonToUint8Array,
  predetermineCID,
} from './utils'
import { stringToStream } from '../utils/utils'

export const extractManifest = async (assetArchive: Uint8Array) => {
  const manifestStream = await extractFileFromArchive(assetArchive, MANIFEST_FILE)
  const manifest = await extractContentFromStream(manifestStream)
  const manifestSchemaStream = stringToStream(SCHEMA.manifest)
  const { conforms, report } = await validateShacl(manifestSchemaStream)(manifestStream)
  return { conforms, report, data: JSON.parse(manifest) }
}

export const extractDomainMetadata = async (assetArchive: Uint8Array, manifest: Manifest) => {
  const domainMetadataPath = getDomainMetadataPath(manifest)
  const domainMetadataStream = await extractFileFromArchive(assetArchive, domainMetadataPath)
  const domainMetadata = await extractContentFromStream(domainMetadataStream).then(JSON.parse)
  const schemas = getDomainMetadataSchemas(domainMetadata['@context'])
  const validationsPromises = schemas.map(schema => validateShacl(stringToStream(schema))(domainMetadataStream))
  const validationsResults = await Promise.all(validationsPromises)
  const cid = await predetermineCID(jsonToUint8Array(domainMetadata))

  return {
    conforms: all(x => equals(true)(prop('conforms')(x)), validationsResults),
    report: validationsResults,
    data: domainMetadata,
    cid,
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
    fileSize: (await streamToUint8Array(coverImageStream)).byteLength,
    uri: `${formatAssetUri(coverImage.cid)}${coverImage.path}`,
  }
}
