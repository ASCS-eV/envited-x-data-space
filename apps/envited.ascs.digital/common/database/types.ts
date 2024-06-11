import { StringChange } from '@nx/devkit'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

import * as schema from './schema'

export type DatabaseConnection = PostgresJsDatabase<typeof schema>
export type Database = () => Promise<{ [x: string]: any }>
export interface Asset {
  id: string
  metadata: string
  status: string
}

export interface Issuer {
  id: string
  type: string
  name: string
  url: string
}

export interface Address {
  type: string
  streetAddress: string
  postalCode: string
  addressLocality: string
  addressCountry: string
}

export interface AscsMember extends AscsUser {
  url: string
  articlesOfAssociation: string
  contributionRules: string
  vatId: string
}

export interface AscsUser {
  id: string
  type: string
  name: string
  email?: string
  address: Address
  isAscsMember: boolean
  isEnvitedMember: boolean
  privacyPolicy: string
}

export interface Credential {
  type: string[]
  issuanceDate: string
  expirationDate: string
  id: string
  issuer: Issuer
  credentialSubject: AscsMember | AscsUser
}

export interface User {
  id: string
  name: string
  email: string
  vatId: string
  privacyPolicyAccepted: string
  articlesOfAssociationAccepted: string
  contributionRulesAccepted: string
  isAscsMember: boolean
  isEnvitedMember: boolean
  addressTypeId: string
  streetAddress: StringChange
  postalCode: StringChange
  addressLocality: StringChange
  addressCountry: StringChange
  issuerId: StringChange
  issuanceDate: string
  expirationDate: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CompanyCategory {
  id: string
  name?: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

export interface Profile {
  id: string
  name: string
  description?: string
  logo?: string
  streetAddress?: string
  postalCode?: string
  addressLocality?: string
  addressCountry?: string
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  website?: string
  offerings?: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
  categories?: CompanyCategory[]
}
