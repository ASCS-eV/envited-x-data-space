/**
 * Copyright 2024 Software Engineering for Business Information Systems (sebis) <matthes@tum.de> .
 * SPDX-License-Identifier: MIT
 */
import { FrontendApi, IdentityApi, OAuth2Api } from '@ory/client'
import { Context } from 'aws-lambda'
import { Redis } from 'ioredis'
import * as jose from 'jose'

import { Log } from '../common/logger'

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

export interface LogContext extends Context {
  log: Log
}

export interface JoseContext extends Context {
  importJWK: (jwk: jose.JWK, alg?: string) => Promise<jose.KeyLike | Uint8Array>
  signJWT: (payload: jose.JWTPayload) => jose.SignJWT
}

export interface DIDContext extends Context {
  keyToVerificationMethod: any
  keyToDID: any
}

export interface RedisHydraContext extends RedisContext, HydraContext {}
export interface RedisLogContext extends RedisContext, LogContext {}
export interface RedisHydraLogContext extends RedisContext, HydraContext, LogContext {}
export interface LogJoseDIDContext extends LogContext, JoseContext, DIDContext {}
