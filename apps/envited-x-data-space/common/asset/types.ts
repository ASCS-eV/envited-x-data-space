export enum ManifestCategoryId {
  envitedXIsDocumentation = 'envited-x:isDocumentation',
  envitedXIsLicense = 'envited-x:isLicense',
  envitedXIsManifest = 'envited-x:isManifest',
  envitedXIsMedia = 'envited-x:isMedia',
  envitedXIsMetadata = 'envited-x:isMetadata',
  envitedXIsMiscellaneous = 'envited-x:isMiscellaneous',
  envitedXIsSimulationData = 'envited-x:isSimulationData',
  envitedXIsReferencedSimulationData = 'envited-x:isReferencedSimulationData',
  envitedXIsValidationReport = 'envited-x:isValidationReport',
  envitedXIsOwner = 'envited-x:isOwner',
}

export enum MetadataType {
  environmentModel = 'environment-model:EnvironmentModel',
  envitedX = 'envited-x:SimulationAsset',
  hdmap = 'hdmap:HdMap',
  ositrace = 'ositrace:OSITrace',
  scenario = 'scenario:Scenario',
  surfaceModel = 'surface-model:SurfaceModel',
}

export enum AccessRole {
  envitedXIsOwner = 'envited-x:isOwner',
  manifestIsPublic = 'manifest:isPublic',
  envitedXIsPublic = 'envited-x:isPublic',
  envitedXIsRegistered = 'envited-x:isRegistered',
}

type ManifestArtifacts = [ManifestMetadataLink, ...ManifestLink[]]

export interface Manifest {
  '@context': { [K in ManifestContext]: string }
  '@id': string
  '@type': string
  'manifest:hasManifestReference': ManifestLink
  'manifest:hasLicense': ManifestLicense
  'manifest:hasArtifacts': ManifestArtifacts
  'manifest:hasReferencedArtifacts': []
}

export type ManifestContext =
  | 'automotive-simulator'
  | 'environment-model'
  | 'envited-x'
  | 'general'
  | 'georeference'
  | 'gx'
  | 'hdmap'
  | 'leakage-test'
  | 'manifest'
  | 'openlabel'
  | 'ositrace'
  | 'rdf'
  | 'scenario'
  | 'service'
  | 'sh'
  | 'simulated-sensor'
  | 'simulated-model'
  | 'skos'
  | 'surface-model'
  | 'survey'
  | 'vv-report'
  | 'xsd'

export interface ManifestValue<T> {
  '@value': T
  '@type': string
}

export interface ManifestHasFileMetadata {
  '@type': string
  'manifest:filePath': ManifestValue<string>
  'manifest:mimeType': ManifestValue<string>
  'manifest:fileSize'?: ManifestValue<number>
  'manifest:filename'?: ManifestValue<string>
}

export interface ManifestId<T> {
  '@type': string
  '@id': T
}

export interface ManifestLink {
  '@type': string
  'manifest:hasAccessRole': ManifestId<AccessRole>
  'manifest:hasCategory': ManifestId<ManifestCategoryId>
  'manifest:hasFileMetadata': ManifestHasFileMetadata
}

export interface ManifestMetadataLink extends ManifestLink {
  'manifest:iri': {
    '@id': string
  }
  'skos:note': ManifestValue<string>
  'sh:conformsTo': {
    '@id': string
  }
}

export interface ManifestLicense {
  '@type': string
  'gx:license': {
    '@value': string
  }
  'manifest:licenseData': ManifestLicenseData
}

export interface ManifestLicenseData {
  '@type': string
  'manifest:hasAccessRole': ManifestId<AccessRole>
  'manifest:hasCategory': ManifestId<ManifestCategoryId>
  'manifest:hasFileMetadata': ManifestHasFileMetadata
}

export interface ExtractedResource {
  path: string
  category: ManifestCategoryId
  mimeType: string
}

export interface ExtractedResourceWithCID extends ExtractedResource {
  cid: string
}

export interface ManifestExtractedResources {
  owner: ExtractedResource[]
  registeredUser: ExtractedResource[]
  publicUser: ExtractedResource[]
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
