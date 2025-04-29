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
  modifiedManifest,
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
    fileSize: number
  }
  manifest: {
    cid: string
    fileSize: number
    data: Manifest
  }
  modifiedManifest: {
    cid: string
    fileSize: number
    data: Record<string, unknown>
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
  const context = domainMetadata.data['@context'] as Record<string, string>

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
      // asset
      {
        uri: formatAssetUri(asset.cid),
        hash: asset.cid,
        mimeType: 'application/zip',
        fileSize: asset.fileSize,
        fileName: `${asset.cid}.zip`,
      },
      // original manifest
      {
        uri: formatIpfsUri(manifest.cid),
        hash: manifest.cid,
        mimeType: 'application/ld+json',
        fileSize: manifest.fileSize,
        fileName: 'manifest_reference.json',
      },
      // envited-x manifest
      {
        uri: formatIpfsUri(manifest.cid),
        hash: modifiedManifest.cid,
        mimeType: 'application/ld+json',
        fileSize: modifiedManifest.fileSize,
        fileName: 'envited-x_manifest.json',
      },
      // domain metadata
      {
        uri: formatIpfsUri(domainMetadata.cid),
        hash: domainMetadata.cid,
        mimeType: 'application/ld+json',
        fileSize: domainMetadata.fileSize,
        fileName: 'domain_metadata.json',
      },
      // display
      {
        uri: formatIpfsUri(display.cid),
        hash: display.cid,
        fileSize: display.fileSize,
        fileName: extractFilenameFromPath(display.uri),
      },
    ],
    attributes: [
      {
        name: context[ASSET_TYPE[type]],
        value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/releases/tag/v0.0.4',
        type: 'uri',
      },
      {
        name: context['envited-x'],
        value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/releases/tag/v0.0.4',
        type: 'uri',
      },
    ],
  }
}
