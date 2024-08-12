/**
 * Copyright 2024 Software Engineering for Business Information Systems (sebis) <matthes@tum.de> .
 * SPDX-License-Identifier: MIT
 */
import * as jose from 'jose'

import { Log } from '../../common/logger'
import { formatError } from '../../common/utils'
import { pex } from '../../config/pex'
import { policies } from '../../config/policies'
import { generatePresentationDefinition } from '../../utils'

export const getPresentCredential =
  ({
    log,
    importJWK,
    signJWT,
    keyToVerificationMethod,
    keyToDID,
  }: {
    log: Log
    importJWK: (jwk: jose.JWK, alg?: string) => Promise<jose.KeyLike | Uint8Array>
    signJWT: (payload: jose.JWTPayload) => void
    keyToVerificationMethod: any
    keyToDID: any
  }) =>
  async (loginId: string) => {
    try {
    log.info('GET: Presenting credential')
    const presentationDefinition = generatePresentationDefinition(
      policies[process.env.LOGIN_POLICY || 'acceptAnything'],
      pex.descriptorASCSFromAltme,
    )

    log.info('PRESENTATION DEFINITION', JSON.stringify(presentationDefinition))

    const did = keyToDID('key', process.env.DID_KEY_JWK!)
    const verificationMethod = await keyToVerificationMethod('key', process.env.DID_KEY_JWK!)
    const challenge = loginId
    const payload = {
      client_id: did,
      client_id_scheme: 'did',
      client_metadata_uri: `${process.env.EXTERNAL_URL}/client-metadata`,
      nonce: challenge,
      presentation_definition: presentationDefinition,
      response_mode: 'direct_post',
      response_type: 'vp_token',
      response_uri: `${process.env.EXTERNAL_URL}/present-credential`,
      state: challenge,
    }

    log.info('CHALLENGE', challenge)

    const privateKey = await importJWK(JSON.parse(process.env.DID_KEY_JWK!), 'EdDSA')
    log.info('PRIVATE KEY', privateKey)
    
    const token = await new signJWT(payload)
      .setProtectedHeader({
        alg: 'EdDSA',
        kid: verificationMethod,
        typ: 'JWT',
      })
      .setIssuedAt()
      .setIssuer(did)
      .setAudience('https://self-issued.me/v2') // by definition
      .setExpirationTime('1 hour')
      .sign(privateKey)
      .catch((err: unknown) => {
        log.error(err)
      })
    log.info('TOKEN', token)
    return token
    } catch (error: unknown) {
      log.error(formatError(error))
    }
  }
