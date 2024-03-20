/**
 * Copyright 2024 Software Engineering for Business Information Systems (sebis) <matthes@tum.de> .
 * SPDX-License-Identifier: MIT
 */
import { Redis } from 'ioredis'

import { HydraAdmin } from '../../types'
import { extractClaims, isTrustedPresentation, verifyAuthenticationPresentation } from '../../utils'

export const postPresentCredential = (redis: Redis, hydraAdmin: HydraAdmin) => async (vpToken: string) => {
  console.log('LOGIN API POST')

  // Parse the JSON string into a JavaScript object
  const presentation = JSON.parse(vpToken)
  console.log('Presentation: \n', vpToken)

  // Verify the presentation and the status of the credential
  if (await verifyAuthenticationPresentation(presentation)) {
    // Evaluate if the VP should be trusted
    if (isTrustedPresentation(presentation)) {
      console.log('Presentation verified')
    } else {
      console.log('Presentation not trusted')
      throw new Error('Presentation not trusted')
    }
  } else {
    console.log('Presentation invalid')
    throw new Error('Presentation invalid')
  }

  // Get the user claims
  const userClaims = extractClaims(presentation)
  const subject = presentation['holder']
  const login_id = presentation['proof']['challenge']
  const challenge = (await redis.get('' + login_id))!
  console.log('Logging in: ' + subject + ' with challenge: ' + challenge)

  // hydra login
  await hydraAdmin.oauth2
    .getOAuth2LoginRequest({ loginChallenge: challenge })
    .then(() =>
      hydraAdmin.oauth2
        .acceptOAuth2LoginRequest({
          loginChallenge: challenge,
          acceptOAuth2LoginRequest: {
            // Subject is an alias for user ID. A subject can be a random string, a UUID, an email address, ....
            subject,
            // This tells hydra to remember the browser and automatically authenticate the user in future requests. This will
            // set the "skip" parameter in the other route to true on subsequent requests!
            remember: Boolean(false),
            // When the session expires, in seconds. Set this to 0 so it will never expire.
            remember_for: 3600,
            // Sets which "level" (e.g. 2-factor authentication) of authentication the user has. The value is really arbitrary
            // and optional. In the context of OpenID Connect, a value of 0 indicates the lowest authorization level.
            // acr: '0',
            //
            // If the environment variable CONFORMITY_FAKE_CLAIMS is set we are assuming that
            // the app is built for the automated OpenID Connect Conformity Test Suite. You
            // can peak inside the code for some ideas, but be aware that all data is fake
            // and this only exists to fake a login system which works in accordance to OpenID Connect.
            //
            // If that variable is not set, the ACR value will be set to the default passed here ('0')
            acr: '0',
          },
        })
        .then(({ data: body }) => {
          const MAX_AGE = 30 // 30 seconds
          const EXPIRY_MS = 'EX' // seconds

          // save the user claims to redis
          redis.set('' + subject, JSON.stringify(userClaims), EXPIRY_MS, MAX_AGE)

          // save the redirect address to redis for the browser
          redis.set('redirect' + login_id, String(body.redirect_to), EXPIRY_MS, MAX_AGE)
          // phone just gets a 200 ok
          return true
        }),
    )
    // This will handle any error that happens when making HTTP calls to hydra
    .catch((error: any) => {
      throw error
    })
}
