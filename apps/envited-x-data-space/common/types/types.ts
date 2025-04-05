export enum Language {
  nl = 'nl',
  en = 'en',
}

export type Environment = 'development' | 'staging' | 'production'

export interface TranslationsMap {
  [Language.en]: { [key: string]: { [key: string]: string } }
  [Language.nl]: { [key: string]: { [key: string]: string } }
}

export enum UploadStatus {
  idle = 'idle',
  queued = 'queued',
  uploading = 'uploading',
  uploaded = 'uploaded',
  error = 'error',
}

export enum AssetStatus {
  processing = 'processing',
  rejected = 'rejected',
  pending = 'pending',
  minted = 'minted',
  completed = 'completed',
}

export enum AssetAction {
  mint = 'mint',
  view = 'view',
  delete = 'delete',
}

export enum Columns {
  two = 'two',
  three = 'three',
  four = 'four',
  five = 'five',
}

export enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum ColorScheme {
  light = 'light',
  dark = 'dark',
}

export enum ButtonType {
  default = 'default',
  block = 'block',
}

export enum UploadTypes {
  png = 'image/png',
  jpeg = 'image/jpeg',
}

export type Obj = { [key: string]: string | number }

export type Action<T> = {
  type: T
  data?: Obj
}

export interface IRole {
  id: string
  name: string
  description: string
}

export enum Role {
  user = 'user',
  principal = 'principal',
  provider = 'provider',
  federator = 'federator',
}

export enum CredentialType {
  AscsMember = 'AscsMember',
  AscsUser = 'AscsUser',
}

export interface Asset {
  id: string
  tokenId: string
  cid: string
  name: string | undefined
  metadata: AssetMetadata
  status: AssetStatus
  userId: string
  ownerId: string
  createdAt: Date
}

export interface AssetMetadata {
  name: string
  symbol: string
  decimals: number
  shouldPreferSymbol: boolean
  thumbnailUri: string
}

export interface Token {
  id: string
  hashGlobalIdentifierId: string
  createdAt: string
  contract: string
  minter: string
  tokenId: number
  displayUri: string
  tokenMetadata: string
  name: string
  description: string
  creators: string[]
  publishers: string[]
  date: string
  type: string
  rights: string
  rightsUri: string
  language: string
  manifest: Record<string, any>
  domainMetadata: Record<string, any>
  artifactUri: string
  identifier: string
  externalUri: string
  updatedAt: string
}

export interface TokenAttribute {
  tokenId: string
  name: string
  value: string
}

export interface User {
  id: string
  uuid: string
  issuerId: string
  addressCountry: string
  addressLocality: string
  addressTypeId: string
  articlesOfAssociationAccepted?: string
  contributionRulesAccepted?: string
  createdAt: string
  email?: string
  expirationDate: string
  isAscsMember: boolean
  isEnvitedMember: boolean
  issuanceDate: string
  name: string
  postalCode: string
  privacyPolicyAccepted: string
  streetAddress: string
  updatedAt: string
  vatId?: string
  isActive: boolean
  urnGlobalIdentifierId: string
  addressGlobalIdentifierId: string
  usersToCredentialTypes?: {
    credentialType: {
      name: string
    }
  }[]
  addressGlobalIdentifier?: GlobalIdentifier
  urnGlobalIdentifier?: GlobalIdentifier
}

export interface UploadAssetState {
  status: UploadStatus
  progress: number
}

export interface Profile {
  id?: string
  name: string
  slug: string
  description?: string | null
  logo?: string | null
  streetAddress: string | null
  postalCode: string | null
  addressLocality: string | null
  addressCountry: string | null
  website?: string | null
  offerings?: unknown | null
  isPublished?: boolean | null
  createdAt?: Date | null
  updatedAt?: Date | null
  salesName?: string | null
  salesPhone?: string | null
  salesEmail?: string | null
  principalName?: string | null
  principalPhone?: string | null
  principalEmail?: string | null
  principalUserId?: string | null
}

export interface Session {
  user: {
    did: string
    id: string
    role: Role
  }
}

export enum FileType {
  json = 'application/json',
}

export enum IdentifierMethod {
  didPkh = 'did:pkh',
  urnUuid = 'urn:uuid',
  urnContract = 'urn:contract',
  urnOperation = 'urn:operation',
}

export interface GlobalIdentifier {
  method: IdentifierMethod
  namespace?: string | null
  chainId?: string | null
  nss: string
}
