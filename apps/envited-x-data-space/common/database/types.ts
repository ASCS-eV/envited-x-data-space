import { StringChange } from '@nx/devkit'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

import * as schema from './schema'

export type DatabaseConnection = PostgresJsDatabase<typeof schema>
export type Database = () => Promise<{ [x: string]: any }>

export interface Issuer {
  id?: string
  globalIdentifierId: string
  type: string
  name: string
  url: string
}

export interface Address {
  '@type': string
  country: string
  postalCode: string
  streetAddress: string
  addressLocality: string
  countrySubdivisionCode: string
}

export interface AscsMember {
  id: string
  type: string
  website: string
  legalForm: string
  legalName: string
  dunsNumber: string
  legalAddress: Address,
  termsOfSimpulseId: Policy,
  registrationNumber: {
    '@type': "gx:VatID",
    vatID: string,
    countryCode: string
  },
  headquartersAddress: Address,
  revocationRegistryIndex: string
}

export interface Policy {
  id: string
  type: string
}

export interface AscsUser {
  id: string
  type: "ascs:User"
  email: string
  memberOf: string
  givenName: string
  familyName: string
  privacyPolicy: Policy
  revocationRegistryIndex: string
}

export interface Policy {
  id: string
  type: string
}

export interface CredentialIssuer {
  id: string
  type: string
  member: string
  revocationRegistry: string
}

export interface Credential {
  type: string[]
  issuanceDate: string
  expirationDate: string
  id: string
  issuer: CredentialIssuer
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
