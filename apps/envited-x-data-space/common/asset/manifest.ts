import { equals, find, includes, isNotNil, map, path, pathOr, pipe, propEq, propOr, tail } from 'ramda'

import { db } from '../database/queries'
import { Database } from '../database/types'
import { parseGlobalIdentifier } from '../globalIdentifiers'
import { Log, log } from '../logger'
import { formatAssetUri, formatError, formatIpfsUri, formatMetadataUri, internalServerErrorError } from '../utils'
import {
  AccessRole,
  ExtractedResourceWithCID,
  Manifest,
  ManifestCategoryId,
  ManifestLink,
  ManifestMetadataLink,
} from './types'
import { formatManifestLinkPath, isRemoteUrl } from './utils'

export const _createModifiedManifest =
  ({
    getOrCreateGlobalIdentifierUuid,
    formatReferencedArtifactManifestId,
  }: {
    getOrCreateGlobalIdentifierUuid: (fullResourceName: string) => Promise<string>
    formatReferencedArtifactManifestId: (
      artifact: ManifestMetadataLink | ManifestLink,
    ) => Promise<ManifestMetadataLink | ManifestLink>
  }) =>
  ({
    assetCID,
    domainMetadataCID,
    media,
  }: {
    assetCID: string
    domainMetadataCID: string
    media: ExtractedResourceWithCID[]
  }) =>
  async (manifest: Manifest): Promise<Record<string, unknown>> => ({
    ...manifest,
    '@id': await getOrCreateGlobalIdentifierUuid(manifest['@id']),
    'manifest:hasManifestReference': modifyManifestLink(
      assetCID,
      domainMetadataCID,
      media,
    )(manifest['manifest:hasManifestReference']),
    'manifest:hasArtifacts': map(modifyManifestLink(assetCID, domainMetadataCID, media))(
      manifest['manifest:hasArtifacts'],
    ),
    'manifest:hasLicense': {
      ...manifest['manifest:hasLicense'],
      'manifest:licenseData': modifyManifestLink(
        assetCID,
        domainMetadataCID,
        media,
      )(manifest['manifest:hasLicense']['manifest:licenseData']),
    },
    'manifest:hasReferencedArtifacts': await Promise.all(
      manifest['manifest:hasReferencedArtifacts']?.map(formatReferencedArtifactManifestId) ?? [],
    ),
  })

export const modifyManifestLink =
  (assetCID: string, domainMetadataCID: string, media: ExtractedResourceWithCID[]) => (link: ManifestLink) => ({
    ...link,
    'manifest:hasFileMetadata': {
      ...link['manifest:hasFileMetadata'],
      'manifest:filePath': {
        ...link['manifest:hasFileMetadata']['manifest:filePath'],
        '@value': formatManifestUri(assetCID, domainMetadataCID, media)(
          link['manifest:hasAccessRole']['@id'],
          link['manifest:hasFileMetadata']['manifest:filePath']['@value'],
          link['manifest:hasCategory']['@id'],
        ),
      },
    },
  })

export const formatReferencedArtifactManifestId = async (
  artifact: ManifestMetadataLink | ManifestLink,
): Promise<ManifestMetadataLink | ManifestLink> => {
  if (path(['manifest:iri', '@id'])(artifact)) {
    return {
      ...artifact,
      'manifest:iri': {
        '@id': await getOrCreateGlobalIdentifierUuid(pathOr('', ['manifest:iri', '@id'])(artifact)),
      },
    }
  }

  return artifact
}

export const formatManifestUri =
  (assetCID: string, domainMetadataCID: string, media: ExtractedResourceWithCID[]) =>
  (accessRole: AccessRole, path: string, category: ManifestCategoryId) => {
    if (includes(category, [ManifestCategoryId.envitedXIsMedia]) && equals(accessRole)(AccessRole.envitedXIsPublic)) {
      return pipe(find(propEq(formatManifestLinkPath(path), 'path')), propOr('', 'cid'), formatIpfsUri)(media)
    }

    if (includes(category, [ManifestCategoryId.envitedXIsMetadata])) {
      return formatIpfsUri(domainMetadataCID)
    }

    if (equals(accessRole)(AccessRole.envitedXIsOwner)) {
      return !isRemoteUrl(path) ? `${formatAssetUri(assetCID)}${tail(path)}` : path
    }

    if (
      equals(accessRole)(AccessRole.envitedXIsRegistered) ||
      (equals(accessRole)(AccessRole.envitedXIsRegistered) && equals(ManifestCategoryId.envitedXIsLicense)(category))
    ) {
      return `${formatMetadataUri(assetCID)}${tail(path)}`
    }

    if (equals(accessRole)(AccessRole.envitedXIsPublic) && equals(ManifestCategoryId.envitedXIsLicense)(category)) {
      return path
    }

    if (equals(accessRole)(AccessRole.envitedXIsPublic)) {
      return `${formatIpfsUri(assetCID)}${tail(path)}`
    }
  }

export const _getOrCreateGlobalIdentifierUuid =
  ({ db, log }: { db: Database; log: Log }) =>
  async (fullResourceName: string) => {
    try {
      const parsedGlobalIdentifier = parseGlobalIdentifier(fullResourceName)
      const connection = await db()
      const existingGlobalIdentifier = await connection.getGlobalIdentifierByScopedIdentifier(
        parsedGlobalIdentifier.scopedIdentifier,
      )

      if (isNotNil(existingGlobalIdentifier)) {
        return existingGlobalIdentifier.id
      }

      const globalIdentifier = await connection.insertGlobalIdentifier(parsedGlobalIdentifier)

      return globalIdentifier.id
    } catch (error: unknown) {
      log.error(formatError(error))
      throw internalServerErrorError()
    }
  }

export const getOrCreateGlobalIdentifierUuid = _getOrCreateGlobalIdentifierUuid({ db, log })

export const createModifiedManifest = _createModifiedManifest({
  getOrCreateGlobalIdentifierUuid,
  formatReferencedArtifactManifestId,
})
