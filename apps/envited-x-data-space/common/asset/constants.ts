import { MetadataType } from './types'

export const ASSET_TYPE = {
  [MetadataType.environmentModel]: 'environment-model',
  [MetadataType.envitedX]: 'envited-x',
  [MetadataType.hdmap]: 'hdmap',
  [MetadataType.ositrace]: 'ositrace',
  [MetadataType.scenario]: 'scenario',
  [MetadataType.surfaceModel]: 'surface-model',
}

export const MANIFEST_FILE = 'manifest_reference.json'

export const README_FILE = 'README.md'

export const MANIFEST_ARTIFACTS = ['manifest:hasArtifacts']

export const MANIFEST_LICENSE_DATA = ['manifest:hasLicense', 'manifest:licenseData']

export const MANIFEST_LICENSE = ['manifest:hasLicense', 'gx:license', '@value']

export const MANIFEST_LICENSE_PATH = [
  'manifest:hasLicense',
  'manifest:licenseData',
  'manifest:hasFileMetadata',
  'manifest:filePath',
  '@value',
]

export const MANIFEST_REFERENCE = ['manifest:hasManifestReference']

export const MANIFEST_CATEGORY_ID = ['manifest:hasCategory', '@id']

export const MANIFEST_LINK_FILE_PATH = ['manifest:hasFileMetadata', 'manifest:filePath', '@value']

export const MANIFEST_LINK_MIME_TYPE = ['manifest:hasFileMetadata', 'manifest:mimeType', '@value']

export const MANIFEST_LINK_ACCESS_ROLE = ['manifest:hasAccessRole', '@id']

export const DOMAIN_METADATA_FILE = 'metadata/domainMetadata.json'

export const MEDIA_DESCRIPTOR = 'envited-x:isMedia'

export const KEYWORDS = ['Has ']
