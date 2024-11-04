import { equals, evolve, includes, map, tail } from 'ramda'

import { formatAssetUri, formatIpfsUri, formatMetadataUri } from './createTokenMetadata.utils'
import { AccessRole, ManifestLink } from './types'

export const createModifiedManifest = ({
  assetCID,
  domainMetadataCID,
}: {
  assetCID: string
  domainMetadataCID: string
}) =>
  evolve({
    'manifest:data': {
      'manifest:assetData': map(modifyManifestLink(assetCID, domainMetadataCID)),
      'manifest:licenseData': modifyManifestLink(assetCID, domainMetadataCID),
      'manifest:contentData': map(modifyManifestLink(assetCID, domainMetadataCID)),
    },
  })

export const modifyManifestLink = (assetCID: string, domainMetadataCID: string) => (link: ManifestLink) => ({
  ...link,
  'manifest:relativePath': {
    ...link['manifest:relativePath'],
    '@value': formatManifestUri(assetCID, domainMetadataCID)(
      link['manifest:accessRole'],
      link['manifest:relativePath']['@value'],
      link['manifest:type'],
      link['manifest:format'],
    ),
  },
})

export const formatManifestUri =
  (assetCID: string, domainMetadataCID: string) =>
  (accessRole: AccessRole, path: string, type: string, format: string) => {
    if (includes(type, ['visualization'])) {
      // CREATE UNIQUE CID FOR PUBLIC USER FILE
      return formatIpfsUri('CREATE_UNIQUE_CID') // OWN CID
    }

    if (includes(type, ['metadata'])) {
      return formatIpfsUri(domainMetadataCID)
    }

    if (equals(accessRole)(AccessRole.owner)) {
      return `${formatAssetUri(assetCID)}${tail(path)}`
    }

    if (
      equals(accessRole)(AccessRole.registeredUser) ||
      (equals(accessRole)(AccessRole.publicUser) && format === 'md')
    ) {
      return `${formatMetadataUri(assetCID)}${tail(path)}`
    }

    if (equals(accessRole)(AccessRole.publicUser)) {
      return `${formatIpfsUri(assetCID)}${tail(path)}`
    }
  }
