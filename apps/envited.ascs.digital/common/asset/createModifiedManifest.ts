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
      'manifest:contentData': map(modifyManifestLink(assetCID, domainMetadataCID)),
    },
    // 'manifest:license': {
    //   'manifest:licenseData': modifyManifestLink(assetCID, domainMetadataCID),
    // }
  })

export const modifyManifestLink = (assetCID: string, domainMetadataCID: string) => (link: ManifestLink) => ({
  ...link,
  'manifest:path': {
    ...link['manifest:path'],
    '@value': formatManifestUri(assetCID, domainMetadataCID)(
      link['manifest:accessRole'],
      link['manifest:path']['@value'],
      link['manifest:type'],
      link['manifest:format'],
    ),
  },
})

const IMPRESSIONS_ARRAY = {
  './visualization/TestfeldNiedersachsen_ALKS_ODR_sample_01.png':
    'ipfs://QmPg2xq9HAH45tF9EhLfGpYvtjhRL1LnB2jrHx7WUxKDzg',
  './visualization/TestfeldNiedersachsen_ALKS_ODR_sample_02.png':
    'ipfs://QmVgViCWeYCgu1Xv2rAJGFApCd4qUgmHWNVskPcYRAgsuf',
  './visualization/TestfeldNiedersachsen_ALKS_ODR_sample_03.png':
    'ipfs://QmTcZJaHir2CGJKaGjUV316GiTkUYhHbai9jxKEodAAfFf',
  './visualization/bbox.geojson': 'ipfs://QmXmRRCutfE3LN9g4ggmVkKb1WdBMLWVKFngdqdkh64q3S',
  './visualization/roadNetwork.geojson': 'ipfs://QmUkN3ktmtqF8muBP8VLxMC9JWr8u8iqnswNo2BtWGVWZ7',
  './visualization/detailRoadNetwork.geojson': 'ipfs://Qmf7FLUveSyy6jjXt7EbnokWQRPSbbm3tT47HZ1KAWPYjr',
} as any

export const formatManifestUri =
  (assetCID: string, domainMetadataCID: string) =>
  (accessRole: AccessRole, path: string, type: string, format: string) => {
    if (includes(type, ['visualization'])) {
      // CREATE UNIQUE CID FOR PUBLIC USER FILE
      return IMPRESSIONS_ARRAY[path] as any
      // return formatIpfsUri('CREATE_UNIQUE_CID') // OWN CID
    }

    if (includes(type, ['metadata'])) {
      return formatIpfsUri(domainMetadataCID)
    }

    if (equals(accessRole)(AccessRole.owner)) {
      return `${formatAssetUri(assetCID)}${tail(path)}`
    }

    if (
      equals(accessRole)(AccessRole.registeredUser) ||
      (equals(accessRole)(AccessRole.publicUser) && type === 'license')
    ) {
      return `${formatMetadataUri(assetCID)}${tail(path)}`
    }

    if (equals(accessRole)(AccessRole.publicUser)) {
      return `${formatIpfsUri(assetCID)}${tail(path)}`
    }
  }
