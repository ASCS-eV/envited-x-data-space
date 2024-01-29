import { relations } from 'drizzle-orm'
import { boolean, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').unique().primaryKey(),
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
  name: text('name').unique().references(() => user.name),
  description: text('description'),
  logo: text('logo'),
  streetAddress: text('street_address'),
  postalCode: text('postal_code'),
  addressLocality: text('address_locality'),
  addressCountry: text('address_country'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  phone: text('phone'),
  email: text('email'),
  website: text('website'),
  offerings: jsonb('offerings'),
  isPublished: boolean('is_published').default(false),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

export const companyCategory = pgTable('companyCategory', {
  id: text('id').unique().primaryKey(),
  name: text('name').unique(),
  description: text('description'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
})

export const profilesToCompanyCategories = pgTable('profilesToCompanyCategories', {
  profileId: uuid('profile_id')
    .references(() => profile.id)
    .notNull(),
  companyCategoryId: text('company_category_id')
    .references(() => companyCategory.id)
    .notNull(),
})

export const profilesToCompanyCategoriesRelations = relations(profilesToCompanyCategories, ({ one }) => ({
  companyCategory: one(companyCategory, {
    fields: [profilesToCompanyCategories.companyCategoryId],
    references: [companyCategory.id],
  }),
  profile: one(profile, {
    fields: [profilesToCompanyCategories.profileId],
    references: [profile.id],
  }),
}))
