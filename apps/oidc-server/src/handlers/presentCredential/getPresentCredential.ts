/**
 * Copyright 2024 Software Engineering for Business Information Systems (sebis) <matthes@tum.de> .
 * SPDX-License-Identifier: MIT
 */
import { keyToDID, keyToVerificationMethod } from '@spruceid/didkit-wasm-node'
import * as jose from 'jose'

import { pex } from '../../config/pex'
import { policies } from '../../config/policies'
import { generatePresentationDefinition } from '../../utils'

export const getPresentCredential = async (loginId: string) => {
  const presentationDefinition = generatePresentationDefinition(
    policies[process.env.LOGIN_POLICY || 'acceptAnything'],
    pex.descriptorEmailFromAltme,
  )
  const did = keyToDID('key', process.env.DID_KEY_JWK!)
  const verificationMethod = await keyToVerificationMethod('key', process.env.DID_KEY_JWK!)
  const challenge = loginId
  const payload = {
    client_id: did,
    client_id_scheme: 'did',
    client_metadata_uri: `${process.env.EXTERNAL_URL}/api/clientMetadata`,
    nonce: challenge,
    presentation_definition: presentationDefinition,
    response_mode: 'direct_post',
    response_type: 'vp_token',
    response_uri: `${process.env.EXTERNAL_URL}/api/presentCredential`,
    state: challenge,
  }
  const privateKey = await jose.importJWK(JSON.parse(process.env.DID_KEY_JWK!), 'EdDSA')
  const token = await new jose.SignJWT(payload)
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
    .catch(err => {
      console.log(err)
      throw err
    })
  console.log('TOKEN: ' + token)
  return token
}
