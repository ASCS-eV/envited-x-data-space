import { extractFilenameFromPath, formatAssetUri, formatIpfsUri } from './createTokenMetadata.utils'
import { Manifest } from './types'

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
  const rightsUri = manifest['manifest:license']['manifest:licenseData']['manifest:path']['@value']

  return {
    decimals: 0,
    isBooleanAmount: true,
    name,
    description,
    tags: ['GaiaX', 'ASCS', 'ENVITED-X', 'EVES', 'nft', `${formatType} ${version}`],
    minter,
    creators: [creator],
    publishers: ['Automotive Solution Center for Simulation e.V.', 'ENVITED-X Data Space'],
    date: '2024-10-29T00:00:00+00:00',
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
        name: 'de.gaiax4plcaad.ontology-management-base.hdmap',
        value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/blob/main/hdmap/',
        type: 'uri',
      },
      {
        name: 'de.gaiax4plcaad.ontology-management-base.hdmap',
        value: formatIpfsUri(domainMetadataCID),
        type: 'application/json',
      },
      {
        name: 'de.gaiax4plcaad.ontology-management-base.manifest',
        value: 'https://github.com/GAIA-X4PLC-AAD/ontology-management-base/blob/main/manifest/',
        type: 'uri',
      },
      {
        name: 'de.gaiax4plcaad.ontology-management-base.manifest',
        value: formatIpfsUri(manifestCID),
        type: 'application/json',
      },
    ],
  }
}
