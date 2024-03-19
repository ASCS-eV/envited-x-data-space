/**
 * Copyright 2024 Software Engineering for Business Information Systems (sebis) <matthes@tum.de> .
 * SPDX-License-Identifier: MIT
 */
import { FrontendApi, IdentityApi, OAuth2Api } from '@ory/client'
import { Context } from 'aws-lambda'
import { Redis } from 'ioredis'

export type ClaimEntry = {
  claimPath: string
  newPath?: string
  token?: string
  required?: boolean
}
export type CredentialPattern = {
  issuer: string
  claims: ClaimEntry[]
}
export type ExpectedCredential = {
  credentialID: string
  patterns: CredentialPattern[]
}
export type LoginPolicy = ExpectedCredential[]

export interface HydraAdmin {
  identity: IdentityApi
  frontend: FrontendApi
  oauth2: OAuth2Api
}

export interface RedisContext extends Context {
  redis: Redis
}

export interface HydraContext extends Context {
  hydraAdmin: HydraAdmin
}

export interface RedisHydraContext extends RedisContext, HydraContext {}
