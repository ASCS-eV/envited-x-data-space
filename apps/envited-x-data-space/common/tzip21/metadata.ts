import { append, equals } from 'ramda'

import { ASSET_SPECIFICATION, ASSET_TYPE } from '../asset/constants'
import { Manifest, MetadataType } from '../asset/types'
import { extractGeneralInformationFromMetadata, formatManifestLinkPath, hasRemoteLinks } from '../asset/utils'
import { TOKEN_PUBLISHERS } from '../constants'
import { TOKEN_TAGS } from '../constants/tokenTags'
import { extractFilenameFromPath, formatAssetUri, formatIpfsUri } from '../utils'

export const createTzip21Metadata = ({
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
    data: Record<string, unknown>
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
  const isThirdPartyHosted = hasRemoteLinks(manifest.data)
  const { data: manifestData } = manifest
  return {
    decimals: 0,
    isBooleanAmount: true,
    name,
    description,
    tags: isThirdPartyHosted ? append(TOKEN_TAGS.THIRD_PARTY_HOSTED)(tags) : tags,
    minter,
    creators: [creator],
    publishers: TOKEN_PUBLISHERS,
    date,
    type: ASSET_SPECIFICATION,
    rights: rights.identifier,
    rightsUri: equals('LicenseRef-Custom-Commercial-Agreement')(rights.identifier)
      ? `${formatAssetUri(asset.cid)}/${formatManifestLinkPath(rights.path)}`
      : rights.path,
    language: 'en',
    artifactUri: formatAssetUri(asset.cid),
    identifier: manifestData['@id'],
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
      // TODO: Add ontology metadata
      {
        name: `de.gaiax4plcaad.ontology-management-base.${ASSET_TYPE[type]}.ontology`,
        value: `https://github.com/GAIA-X4PLC-AAD/ontology-management-base/blob/main/${ASSET_TYPE[type]}/`,
        type: 'uri',
      },
      {
        name: `de.gaiax4plcaad.ontology-management-base.${ASSET_TYPE[type]}.metadata`,
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
