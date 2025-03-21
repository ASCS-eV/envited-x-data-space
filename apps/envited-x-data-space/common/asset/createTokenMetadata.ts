import { append, equals } from 'ramda'

import { TOKEN_TAGS } from '../constants/tokenTags'
import { extractFilenameFromPath, formatAssetUri, formatIpfsUri } from '../utils'
import { ASSET_TYPE } from './constants'
import { Manifest, MetadataType } from './types'
import { extractGeneralInformationFromMetadata, formatManifestLinkPath, hasManifestThirdPartyLinks } from './utils'

export const createTokenMetadata = ({
  asset,
  creator,
  display,
  domainMetadata,
  manifest,
  minter,
  rights,
}: {
  asset: {
    cid: string
    fileSize: number
  }
  creator: string
  display: {
    cid: string
    fileSize: number
    uri: string
  }
  domainMetadata: {
    cid: string
    data: any
  }
  manifest: {
    cid: string
    fileSize: number
    data: Manifest
  }
  minter: string
  rights: {
    identifier: string
    path: string
  }
}) => {
  const type = domainMetadata.data['@type'] as MetadataType
  const { name, description, formatType, version } = extractGeneralInformationFromMetadata(ASSET_TYPE[type])(
    domainMetadata.data,
  )
  const today = new Date()
  const date = today.toISOString().split('T')[0]
  const tags = [
    TOKEN_TAGS.GAIA_X,
    TOKEN_TAGS.ASCS,
    TOKEN_TAGS.ENVITED_X,
    TOKEN_TAGS.EVES,
    TOKEN_TAGS.NFT,
    `${formatType} ${version}`,
  ]
  const isThirdPartyHosted = hasManifestThirdPartyLinks(manifest.data)

  return {
    decimals: 0,
    isBooleanAmount: true,
    name,
    description,
    tags: isThirdPartyHosted ? append(TOKEN_TAGS.THIRD_PARTY_HOSTED)(tags) : tags,
    minter,
    creators: [creator],
    publishers: ['Automotive Solution Center for Simulation e.V.', 'ENVITED-X Data Space'],
    date,
    type: 'EVES-003 https://github.com/ASCS-eV/EVES',
    rights: rights.identifier,
    rightsUri: equals('LicenseRef-Custom-Commercial-Agreement')(rights.identifier)
      ? `${formatAssetUri(asset.cid)}/${formatManifestLinkPath(rights.path)}`
      : rights.path,
    language: 'en',
    artifactUri: formatAssetUri(asset.cid),
    identifier: asset.cid,
    externalUri: formatIpfsUri(manifest.cid),
    displayUri: formatIpfsUri(display.cid),
    formats: [
      {
        uri: formatAssetUri(asset.cid),
        hash: asset.cid,
        mimeType: 'application/zip',
        fileSize: asset.fileSize,
        fileName: `${asset.cid}.zip`,
      },
      {
        uri: formatIpfsUri(manifest.cid),
        hash: manifest.cid,
        mimeType: 'application/json',
        fileSize: manifest.fileSize,
        fileName: 'manifest.json',
      },
      {
        uri: formatIpfsUri(display.cid),
        hash: display.cid,
        fileSize: display.fileSize,
        fileName: extractFilenameFromPath(display.uri),
      },
    ],
    attributes: [
      {
        name: 'de.gaiax4plcaad.ontology-management-base.hdmap.ontology',
        value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/blob/main/hdmap/',
        type: 'uri',
      },
      {
        name: 'de.gaiax4plcaad.ontology-management-base.hdmap.metadata',
        value: formatIpfsUri(domainMetadata.cid),
        type: 'application/json',
      },
      {
        name: 'de.gaiax4plcaad.ontology-management-base.manifest.ontology',
        value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/blob/main/manifest/',
        type: 'uri',
      },
      {
        name: 'de.gaiax4plcaad.ontology-management-base.manifest.metadata',
        value: formatIpfsUri(manifest.cid),
        type: 'application/json',
      },
    ],
  }
}
