import { z } from 'zod'

export const baseUser = z.object({
  id: z.string(),
  name: z.string(),
  isAscsMember: z.boolean(),
  isEnvitedMember: z.boolean(),
  addressTypeId: z.string().uuid(),
  addressCountry: z.string(),
  addressLocality: z.string(),
  postalCode: z.string(),
  streetAddress: z.string(),
  privacyPolicyAccepted: z.string().url({ message: "Invalid url" }),
  issuerId: z.number(),
  role: z.string().array(),
  issuanceDate: z.date(),
  expirationDate: z.date(),
})

export const principal = baseUser.extend({
  url: z.string().url({ message: "Invalid url" }),
  vatId: z.string(),
  articlesOfAssociationAccepted: z.string().url({ message: "Invalid url" }),
  contributionRulesAccepted: z.string().url({ message: "Invalid url" }),
})

export const user = baseUser.extend({
  email: z.string().email({ message: "Invalid email address" }),
})
