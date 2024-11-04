export enum AccessRole {
  owner = 'owner',
  registeredUser = 'registeredUser',
  publicUser = 'publicUser',
}

export interface Manifest {
  '@context': {}
  '@id': string
  '@type': string
  'manifest:data': {
    '@type': string
    'manifest:assetData': ManifestLink[]
    'manifest:contentData': ManifestLink[]
  }
  'manifest:license': ManifestLicense
}

export interface ManifestLink {
  '@type': string
  'manifest:accessRole': AccessRole
  'manifest:type': string
  'manifest:format': string
  'manifest:path': {
    '@value': string
    '@type': string
  }
}

export interface ManifestLicense {
  '@type': string
  'manifest:spdxIdentifier': {
    '@value': string
    '@type': string
  }
  'manifest:licenseData': ManifestLink
}

export interface TokenFormat {
  uri: string
  hash: string
  mimeType: string
  dimensions?: {
    value: string
    unit: string
  }
  fileSize: 2400256
  fileName: string
}

export interface TokenAttribute {
  name: string
  value: string
  type: string
}

export interface TokenMetadata {
  decimals: number
  isBooleanAmount: boolean
  name: string
  description: string
  tags: string[]
  minter: string
  creators: string[]
  publishers: string[]
  date: string
  type: string
  rights: string
  rightsUri: string
  language: string
  artifactUri: string
  identifier: string
  externalUri: string
  displayUri: string
  formats: TokenFormat[]
  attributes: TokenAttribute[]
}
