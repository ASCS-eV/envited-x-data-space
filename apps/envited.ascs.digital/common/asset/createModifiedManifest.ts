import { equals, evolve, find, includes, map, pipe, propEq, propOr, tail } from 'ramda'

import { formatAssetUri, formatIpfsUri, formatMetadataUri } from './createTokenMetadata.utils'
import { AccessRole, ExtractedFileWithCID, ManifestLink } from './types'
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
    'manifest:data': {
      'manifest:assetData': map(modifyManifestLink(assetCID, domainMetadataCID, visualizationFiles)),
      'manifest:contentData': map(modifyManifestLink(assetCID, domainMetadataCID, visualizationFiles)),
    },
    'manifest:license': {
      'manifest:licenseData': modifyManifestLink(assetCID, domainMetadataCID, visualizationFiles),
    },
  })

export const modifyManifestLink =
  (assetCID: string, domainMetadataCID: string, visualizationFiles: ExtractedFileWithCID[]) =>
  (link: ManifestLink) => ({
    ...link,
    'manifest:path': {
      ...link['manifest:path'],
      '@value': formatManifestUri(assetCID, domainMetadataCID, visualizationFiles)(
        link['manifest:accessRole'],
        link['manifest:path']['@value'],
        link['manifest:type'],
        link['manifest:format'],
      ),
    },
  })

export const formatManifestUri =
  (assetCID: string, domainMetadataCID: string, visualizationFiles: ExtractedFileWithCID[]) =>
  (accessRole: AccessRole, path: string, type: string, format: string) => {
    if (includes(type, ['visualization']) && equals(accessRole)(AccessRole.publicUser)) {
      return pipe(
        find(propEq(formatManifestLinkPath(path), 'path')),
        propOr('', 'cid'),
        formatIpfsUri,
      )(visualizationFiles)
    }

    if (includes(type, ['metadata'])) {
      return formatIpfsUri(domainMetadataCID)
    }

    if (equals(accessRole)(AccessRole.owner)) {
      return !isRemoteUrl(path) ? `${formatAssetUri(assetCID)}${tail(path)}` : path
    }

    if (
      equals(accessRole)(AccessRole.registeredUser) ||
      (equals(accessRole)(AccessRole.registeredUser) && type === 'license')
    ) {
      return `${formatMetadataUri(assetCID)}${tail(path)}`
    }

    if (equals(accessRole)(AccessRole.publicUser) && type === 'license') {
      return path
    }

    if (equals(accessRole)(AccessRole.publicUser)) {
      return `${formatIpfsUri(assetCID)}${tail(path)}`
    }
  }
