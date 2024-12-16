import { equals } from 'ramda'

import { extractFilenameFromPath, formatAssetUri, formatIpfsUri } from './createTokenMetadata.utils'
import { Manifest } from './types'
import { formatManifestLinkPath } from './utils'

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
  const name = domainMetadata.data['hdmap:general']['general:description']['general:name']['@value']
  const description = domainMetadata.data['hdmap:general']['general:description']['general:description']['@value']
  const formatType = domainMetadata.data['hdmap:format']['hdmap:formatType']
  const version = domainMetadata.data['hdmap:format']['hdmap:version']['@value']
  const today = new Date()
  const date = today.toISOString().split('T')[0]

  return {
    decimals: 0,
    isBooleanAmount: true,
    name,
    description,
    tags: ['GaiaX', 'ASCS', 'ENVITED-X', 'EVES', 'nft', `${formatType} ${version}`],
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
