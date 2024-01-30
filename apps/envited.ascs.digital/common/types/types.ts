export enum Language {
  nl = 'nl',
  en = 'en',
}

export interface TranslationsMap {
  [Language.en]: { [key: string]: { [key: string]: string } }
  [Language.nl]: { [key: string]: { [key: string]: string } }
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
  admin = 'admin',
  user = 'user',
  principal = 'principal',
  federator = 'federator',
}

export enum CredentialType {
  AscsMember = 'AscsMember',
  AscsUser = 'AscsUser',
}

export interface User {
  id: string
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
}

export interface Profile {
  id?: string
  name: string
  description?: string | null
  logo?: string | null
  streetAddress?: string | null
  postalCode?: string | null
  addressLocality?: string | null
  addressCountry?: string | null
  firstName?: string | null
  lastName?: string | null
  phone?: string | null
  email?: string | null
  website?: string | null
  offerings?: unknown | null
  isPublished?: boolean | null
  createdAt?: Date | null
  updatedAt?: Date | null
}

export interface Session {
  user: {
    pkh: string
    id: string
    role: Role
  }
}
