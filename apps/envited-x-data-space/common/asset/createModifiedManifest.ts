import { equals, evolve, find, includes, map, pipe, propEq, propOr, tail } from 'ramda'

import { formatAssetUri, formatIpfsUri, formatMetadataUri } from '../utils'
import { AccessRole, ExtractedFileWithCID, ManifestCategoryId, ManifestLink } from './types'
import { formatManifestLinkPath, isRemoteUrl } from './utils'

export const createModifiedManifest = ({
  assetCID,
  domainMetadataCID,
  visualizationFiles,
}: {
  assetCID: string
  domainMetadataCID: string
  visualizationFiles: ExtractedFileWithCID[]
}) =>
  evolve({
    'manifest:hasManifestReference': modifyManifestLink(assetCID, domainMetadataCID, visualizationFiles),
    'manifest:hasArtifacts': map(modifyManifestLink(assetCID, domainMetadataCID, visualizationFiles)),
    'manifest:hasLicense': {
      'manifest:licenseData': modifyManifestLink(assetCID, domainMetadataCID, visualizationFiles),
    },
  })

export const modifyManifestLink =
  (assetCID: string, domainMetadataCID: string, visualizationFiles: ExtractedFileWithCID[]) =>
  (link: ManifestLink) => ({
    ...link,
    'manifest:hasFileMetadata': {
      ...link['manifest:hasFileMetadata'],
      'manifest:filePath': {
        ...link['manifest:hasFileMetadata']['manifest:filePath'],
        '@value': formatManifestUri(assetCID, domainMetadataCID, visualizationFiles)(
          link['manifest:hasAccessRole']['@id'],
          link['manifest:hasFileMetadata']['manifest:filePath']['@value'],
          link['manifest:hasCategory']['@id'],
        ),
      },
    },
  })

export const formatManifestUri =
  (assetCID: string, domainMetadataCID: string, visualizationFiles: ExtractedFileWithCID[]) =>
  (accessRole: AccessRole, path: string, category: ManifestCategoryId) => {
    if (includes(category, [ManifestCategoryId.envitedXIsMedia]) && equals(accessRole)(AccessRole.envitedXIsPublic)) {
      return pipe(
        find(propEq(formatManifestLinkPath(path), 'path')),
        propOr('', 'cid'),
        formatIpfsUri,
      )(visualizationFiles)
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
