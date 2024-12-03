export enum AccessRole {
  owner = 'owner',
  registeredUser = 'registeredUser',
  publicUser = 'publicUser',
}

export interface Manifest {
  '@context': ManifestContext
  '@id': string
  '@type': string
  'manifest:data': {
    '@type': string
    'manifest:assetData': ManifestLink[]
    'manifest:contentData': ManifestLink[]
  }
  'manifest:license': ManifestLicense
}

export interface ManifestContext {
  xsd: string
  gx: string
  skos: string
  sh: string
  manifest: string
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

export interface ExtractedFile {
  arrayBuffer: ArrayBuffer
  path: string
  type: string
}

export interface ExtractedFileWithCID extends ExtractedFile {
  cid: string
}

export interface ManifestExtractedFiles {
  owner: ExtractedFile[]
  registeredUser: ExtractedFile[]
  publicUser: ExtractedFile[]
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
