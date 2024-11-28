import { equals } from 'ramda'

import { extractFilenameFromPath, formatAssetUri, formatIpfsUri } from './createTokenMetadata.utils'
import { Manifest } from './types'
import { formatManifestLinkPath } from './validateAndCreateMetadata.utils'

export const createTokenMetadata = ({
  assetCID,
  manifestCID,
  domainMetadataCID,
  displayUriCID,
  displayUri,
  minter,
  creator,
  manifest,
  domainMetadata,
}: {
  assetCID: string
  manifestCID: string
  domainMetadataCID: string
  displayUriCID: string
  displayUri: string
  minter: string
  creator: string
  manifest: Manifest
  domainMetadata: any
}) => {
  const name = domainMetadata['hdmap:general']['general:description']['general:name']['@value']
  const description = domainMetadata['hdmap:general']['general:description']['general:description']['@value']
  const formatType = domainMetadata['hdmap:format']['hdmap:formatType']
  const version = domainMetadata['hdmap:format']['hdmap:version']['@value']
  const rights = manifest['manifest:license']['manifest:spdxIdentifier']['@value']
  const rightsUri = equals('LicenseRef-Custom-Commercial-Agreement')(rights)
    ? `${formatAssetUri(assetCID)}/${formatManifestLinkPath(
        manifest['manifest:license']['manifest:licenseData']['manifest:path']['@value'],
      )}`
    : manifest['manifest:license']['manifest:licenseData']['manifest:path']['@value']
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
    rights,
    rightsUri,
    language: 'en',
    artifactUri: formatAssetUri(assetCID),
    identifier: assetCID,
    externalUri: formatIpfsUri(manifestCID),
    displayUri: formatIpfsUri(displayUriCID),
    formats: [
      {
        uri: formatAssetUri(assetCID),
        hash: assetCID,
        mimeType: 'application/zip',
        fileSize: 3158016,
        fileName: `${assetCID}.zip`,
      },
      {
        uri: formatIpfsUri(manifestCID),
        hash: manifestCID,
        mimeType: 'application/json',
        fileSize: 8192,
        fileName: 'manifest.json',
      },
      {
        uri: formatIpfsUri(displayUriCID),
        hash: displayUriCID,
        mimeType: 'image/png',
        dimensions: {
          value: '1095x850',
          unit: 'px',
        },
        fileSize: 2400256,
        fileName: extractFilenameFromPath(displayUri),
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
        value: formatIpfsUri(domainMetadataCID),
        type: 'application/json',
      },
      {
        name: 'de.gaiax4plcaad.ontology-management-base.manifest.ontology',
        value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/blob/main/manifest/',
        type: 'uri',
      },
      {
        name: 'de.gaiax4plcaad.ontology-management-base.manifest.metadata',
        value: formatIpfsUri(manifestCID),
        type: 'application/json',
      },
    ],
  }
}
