export enum ManifestCategoryId {
  envitedXIsDocumentation = 'envited-x:isDocumentation',
  envitedXIsLicense = 'envited-x:isLicense',
  envitedXIsManifest = 'envited-x:isManifest',
  envitedXIsMedia = 'envited-x:isMedia',
  envitedXIsMetadata = 'envited-x:isMetadata',
  envitedXIsMiscellaneous = 'envited-x:isMiscellaneous',
  envitedXIsSimulationData = 'envited-x:isSimulationData',
  envitedXIsValidationReport = 'envited-x:isValidationReport',
}

export enum AccessRole {
  envitedXIsOwner = 'envited-x:isOwner',
  manifestIsPublic = 'manifest:isPublic',
  envitedXIsPublic = 'envited-x:isPublic',
  envitedXIsRegistered = 'envited-x:isRegistered',
}

type ManifestArtifacts = [ManifestMetadataLink, ...ManifestLink[]]

export interface Manifest {
  '@context': ManifestContext
  '@id': string
  '@type': string
  'manifest:hasManifestReference': ManifestLink
  'manifest:hasLicense': ManifestLink
  'manifest:hasArtifacts': ManifestArtifacts
  'manifest:hasReferencedArtifacts': []
}

export interface ManifestContext {
  xsd: string
  gx: string
  skos: string
  sh: string
  manifest: string
  envited: string
  hdmap: string
  rdf: string
}

export interface ManifestHasAccessRole {
  '@type': string
  '@id': AccessRole
}

export interface ManifestHasCategory {
  '@type': string
  '@id': ManifestCategoryId
}

export interface ManifestFilePath {
  '@value': string
  '@type': string
}
export interface ManifestCid {
  '@value': string
  '@type': string
}
export interface ManifestMimeType {
  '@value': string
  '@type': string
}
export interface ManifestFileSize {
  '@value': number
  '@type': string
}
export interface ManifestFilename {
  '@value': string
  '@type': string
}

export interface ManifestHasFileMetadata {
  '@type': string
  'manifest:filePath': ManifestFilePath
  'manifest:cid': ManifestCid
  'manifest:mimeType': ManifestMimeType
  'manifest:fileSize': ManifestFileSize
  'manifest:filename': ManifestFilename
}

export interface ManifestLink {
  '@type': string
  'manifest:hasAccessRole': ManifestHasAccessRole
  'manifest:hasCategory': ManifestHasCategory
  'manifest:hasFileMetadata': ManifestHasFileMetadata
}

export interface ManifestMetadataLink extends ManifestLink {
  'manifest:iri': {
    '@id': string
  }
  'skos:note': {
    '@value': string
    '@type': string
  }
  'sh:conformsTo': {
    '@id': string
  }
}

export interface ManifestLicense {
  '@type': string
  'gx:license': {
    '@value': string
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
