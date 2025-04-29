import { relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core'

export const globalIdentifier = pgTable(
  'globalIdentifier',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    method: text('method').notNull(),
    namespace: text('namespace'),
    chainId: text('chain_id'),
    fqdn: text('fqdn'),
    scopedIdentifier: text('scoped_identifier').notNull(),
    metadata: jsonb('metadata'),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at'),
  },
  table => [
    unique('composite_identifier_unique').on(table.method, table.namespace, table.chainId, table.scopedIdentifier),
  ],
)

export const user = pgTable('user', {
  id: uuid('id').unique().primaryKey().defaultRandom(),
  urnGlobalIdentifierId: uuid('urn_global_identifier_id')
    .unique()
    .references(() => globalIdentifier.id),
  addressGlobalIdentifierId: uuid('address_global_identifier_id').references(() => globalIdentifier.id),
  name: text('name').unique(),
  email: text('email'),
  isAscsMember: boolean('is_ascs_member'),
  isEnvitedMember: boolean('is_envited_member'),
  streetAddress: text('street_address'),
  postalCode: text('postal_code'),
  addressLocality: text('address_locality'),
  addressCountry: text('address_country'),
  vatId: text('vat_id'),
  privacyPolicyAccepted: text('privacy_policy_accepted'),
  articlesOfAssociationAccepted: text('articles_of_association_accepted'),
  contributionRulesAccepted: text('contribution_rules_accepted'),
  issuerId: uuid('issuer_id')
    .references(() => issuer.id)
    .notNull(),
  addressTypeId: uuid('address_type_id').references(() => addressType.id),
  issuanceDate: timestamp('issuance_date'),
  expirationDate: timestamp('expiration_date'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

export const userRelations = relations(user, ({ many, one }) => ({
  usersToCredentialTypes: many(usersToCredentialTypes),
  usersToRoles: many(usersToRoles),
  urnGlobalIdentifier: one(globalIdentifier, {
    fields: [user.urnGlobalIdentifierId],
    references: [globalIdentifier.id],
  }),
  addressGlobalIdentifier: one(globalIdentifier, {
    fields: [user.addressGlobalIdentifierId],
    references: [globalIdentifier.id],
  }),
}))

export const role = pgTable('role', {
  id: text('id').unique().primaryKey(),
  name: text('name'),
  description: text('description'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

export const roleRelations = relations(role, ({ many }) => ({
  usersToRoles: many(usersToRoles),
}))

export const addressType = pgTable('addressType', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').unique(),
  description: text('description'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

export const issuer = pgTable('issuer', {
  id: uuid('id').defaultRandom().primaryKey(),
  globalIdentifierId: uuid('globalIdentifierId')
    .unique()
    .references(() => globalIdentifier.id),
  name: text('name'),
  url: text('url'),
  type: text('type'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

export const issuerRelations = relations(issuer, ({ one }) => ({
  globalIdentifier: one(globalIdentifier, {
    fields: [issuer.globalIdentifierId],
    references: [globalIdentifier.id],
  }),
}))

export const credentialType = pgTable('credentialType', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  description: text('description'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

export const credentialTypeRelations = relations(credentialType, ({ many }) => ({
  usersToCredentialTypes: many(usersToCredentialTypes),
}))

export const usersToCredentialTypes = pgTable('usersToCredentialTypes', {
  userId: uuid('user_id')
    .references(() => user.id)
    .notNull(),
  credentialTypeId: uuid('credential_type_id')
    .references(() => credentialType.id)
    .notNull(),
})

export const usersToRoles = pgTable('usersToRoles', {
  userId: uuid('user_id')
    .references(() => user.id)
    .notNull(),
  roleId: text('role_id')
    .references(() => role.id)
    .notNull(),
})

export const usersToCredentialTypesRelations = relations(usersToCredentialTypes, ({ one }) => ({
  credentialType: one(credentialType, {
    fields: [usersToCredentialTypes.credentialTypeId],
    references: [credentialType.id],
  }),
  user: one(user, {
    fields: [usersToCredentialTypes.userId],
    references: [user.id],
  }),
}))

export const usersToRolesRelations = relations(usersToRoles, ({ one }) => ({
  role: one(role, {
    fields: [usersToRoles.roleId],
    references: [role.id],
  }),
  user: one(user, {
    fields: [usersToRoles.userId],
    references: [user.id],
  }),
}))

export const profile = pgTable('profile', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name')
    .unique()
    .notNull()
    .references(() => user.name),
  slug: text('slug').unique().notNull(),
  description: text('description'),
  logo: text('logo'),
  streetAddress: text('street_address'),
  postalCode: text('postal_code'),
  addressLocality: text('address_locality'),
  addressCountry: text('address_country'),
  salesName: text('sales_name'),
  salesPhone: text('sales_phone'),
  salesEmail: text('sales_email'),
  principalUserId: uuid('principal_user_id').references(() => user.id),
  principalName: text('principal_name'),
  principalPhone: text('principal_phone'),
  principalEmail: text('principal_email'),
  website: text('website'),
  offerings: jsonb('offerings'),
  isPublished: boolean('is_published').default(false),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

export const profileRelations = relations(profile, ({ many }) => ({
  businessCategories: many(profilesToBusinessCategories),
}))

export const businessCategory = pgTable('businessCategory', {
  id: text('id').unique().primaryKey(),
  name: text('name').unique(),
  description: text('description'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

export const businessCategoryRelations = relations(businessCategory, ({ many }) => ({
  profilesToBusinessCategories: many(profilesToBusinessCategories),
}))

export const profilesToBusinessCategories = pgTable('profilesToBusinessCategories', {
  profileId: uuid('profile_id')
    .references(() => profile.id)
    .notNull(),
  businessCategoryId: text('business_category_id')
    .references(() => businessCategory.id)
    .notNull(),
})

export const profilesToBusinessCategoriesRelations = relations(profilesToBusinessCategories, ({ one }) => ({
  businessCategory: one(businessCategory, {
    fields: [profilesToBusinessCategories.businessCategoryId],
    references: [businessCategory.id],
  }),
  profile: one(profile, {
    fields: [profilesToBusinessCategories.profileId],
    references: [profile.id],
  }),
}))

export const asset = pgTable('asset', {
  id: uuid('id').defaultRandom().primaryKey(),
  cid: text('cid'),
  name: text('name'),
  metadata: jsonb('metadata'),
  manifest: jsonb('manifest'),
  status: text('status', { enum: ['processing', 'rejected', 'pending', 'minted', 'completed'] }),
  ownerId: uuid('owner_id').references(() => user.id),
  userId: uuid('user_id')
    .references(() => user.id)
    .notNull(),
  tokenId: uuid('token_id').references(() => token.id),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('modified_at'),
})

export const assetResource = pgTable('assetResource', {
  id: uuid('id').defaultRandom().primaryKey(),
  assetId: uuid('asset_id')
    .references(() => asset.id)
    .notNull(),
  name: text('name').notNull(),
  cid: text('cid').notNull(),
  mimeType: text('mime_type').notNull(),
  accessLevel: text('access_level', { enum: ['public', 'authenticated', 'owner'] }).notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

export const assetRelations = relations(asset, ({ many }) => ({
  resources: many(assetResource),
}))

export const assetResourceRelations = relations(assetResource, ({ one }) => ({
  asset: one(asset, {
    fields: [assetResource.assetId],
    references: [asset.id],
  }),
}))

export const token = pgTable('token', {
  id: uuid('id').unique().defaultRandom().primaryKey(),
  operationGlobalIdentifierId: uuid('hash_global_identifier_id').references(() => globalIdentifier.id),
  contractGlobalIdentifierId: uuid('contract_global_identifier_id').references(() => globalIdentifier.id),
  minterGlobalIdentifierId: uuid('minter_global_identifier_id').references(() => globalIdentifier.id),
  webGlobalIdentifierId: uuid('web_global_identifier_id').references(() => globalIdentifier.id),
  tokenId: integer('token_id'),
  name: text('name'),
  description: text('description'),
  creators: jsonb('creators'),
  publishers: jsonb('publishers'),
  date: timestamp('date'),
  type: text('type'),
  rights: text('rights'),
  rightsUri: text('rights_uri'),
  language: text('language'),
  artifactUri: text('artifact_uri'),
  identifier: text('identifier'),
  externalUri: text('external_uri'),
  displayUri: text('display_uri'),
  tokenMetadata: jsonb('token_metadata'),
  domainMetadata: jsonb('domain_metadata'),
  manifest: jsonb('manifest'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('modified_at'),
})

export const tokenTag = pgTable('tokenTag', {
  id: serial('id').primaryKey(),
  name: text('name').unique().notNull(),
})

export const tokensToTokenTags = pgTable('tokensToTokenTags', {
  tokenId: uuid('token_id')
    .references(() => token.id)
    .notNull(),
  tagId: integer('tag_id')
    .references(() => tokenTag.id)
    .notNull(),
})

export const tokensToTokenTagsRelations = relations(tokensToTokenTags, ({ one }) => ({
  token: one(token, {
    fields: [tokensToTokenTags.tokenId],
    references: [token.id],
  }),
  tokenTag: one(tokenTag, {
    fields: [tokensToTokenTags.tagId],
    references: [tokenTag.id],
  }),
}))

export const tokenAttributes = pgTable(
  'tokenAttributes',
  {
    tokenId: uuid('token_id'),
    name: text('name').notNull(),
    value: text('value').notNull(),
  },
  table => [primaryKey({ columns: [table.tokenId, table.name] })],
)

export const tokenRelations = relations(token, ({ many, one }) => ({
  tokenAttributes: many(tokenAttributes),
  tokensToTokenTags: many(tokensToTokenTags),
  operationGlobalIdentifier: one(globalIdentifier),
  contractGlobalIdentifier: one(globalIdentifier),
  minterGlobalIdentifier: one(globalIdentifier),
}))

export const tokenAttributesRelations = relations(tokenAttributes, ({ one }) => ({
  token: one(token, {
    fields: [tokenAttributes.tokenId],
    references: [token.id],
  }),
}))
