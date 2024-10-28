import { relations } from 'drizzle-orm'
import { boolean, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').unique().primaryKey(),
  uuid: uuid('uuid').unique(),
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
  issuerId: text('issuer_id')
    .references(() => issuer.id)
    .notNull(),
  addressTypeId: uuid('address_type_id').references(() => addressType.id),
  issuanceDate: timestamp('issuance_date'),
  expirationDate: timestamp('expiration_date'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

export const userRelations = relations(user, ({ many }) => ({
  usersToCredentialTypes: many(usersToCredentialTypes),
  usersToRoles: many(usersToRoles),
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
  id: text('id').unique().primaryKey(),
  name: text('name'),
  url: text('url'),
  type: text('type'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

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
  userId: text('user_id')
    .references(() => user.id)
    .notNull(),
  credentialTypeId: uuid('credential_type_id')
    .references(() => credentialType.id)
    .notNull(),
})

export const usersToRoles = pgTable('usersToRoles', {
  userId: text('user_id')
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
  principalUserId: text('principal_user_id').references(() => user.id),
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
  metadata: jsonb('metadata'),
  status: text('status', { enum: ['processing', 'not_accepted', 'pending', 'completed'] }),
  userId: text('user_id')
    .references(() => user.id)
    .notNull(),
})
