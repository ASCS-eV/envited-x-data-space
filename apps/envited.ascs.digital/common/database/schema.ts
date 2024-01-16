import { relations } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').unique().primaryKey(),
  name: text('name'),
  email: text('email'),
  isAscsMember: boolean('is_ascs_member'),
  isEnvitedMember: boolean('is_envited_member'),
  streetAddress: text('street_address'),
  postalCode: text('postal_code'),
  addressLocality: text('address_location'),
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
})

export const roleRelations = relations(role, ({ many }) => ({
  usersToRoles: many(usersToRoles),
}))

export const addressType = pgTable('addressType', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').unique(),
  description: text('description'),
})

export const issuer = pgTable('issuer', {
  id: text('id').unique().primaryKey(),
  name: text('name'),
  url: text('url'),
  type: text('type'),
})

export const credentialType = pgTable('credentialType', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  description: text('description'),
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
