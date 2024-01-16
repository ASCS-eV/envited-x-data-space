import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

import * as schema from './schema'
import { StringChange } from '@nx/devkit'

export type DatabaseConnection = PostgresJsDatabase<typeof schema>

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

export interface AscsMember {
  id: string
  type: string
  name: string
  url: string
  address: Address
  vatID: string
  isAscsMember: boolean
  isEnvitedMember: boolean
  privacyPolicy: string
  articlesOfAssociation: string
  contributionRules: string
}

export interface AscsUser {
  id: string
  type: string
  name: string
  email: string
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
  createdAt: string
  updatedAt: string
}
