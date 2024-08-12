/**
 * Copyright 2024 Software Engineering for Business Information Systems (sebis) <matthes@tum.de> .
 * SPDX-License-Identifier: MIT
 */
import { Redis } from 'ioredis'

import { Log } from '../../common/logger'
import { formatError } from '../../common/utils'
import { HydraAdmin } from '../../types'
import { isTrustedPresentation, verifyAuthenticationPresentation } from '../../utils'

export const postPresentCredential =
  ({ redis, hydraAdmin, log }: { redis: Redis; hydraAdmin: HydraAdmin; log: Log }) =>
  async (presentation: any) => {
    log.info('POST: Presenting credential')
    log.info('Presentation: \n', presentation)

    // Verify the presentation and the status of the credential
    if (await verifyAuthenticationPresentation(presentation)) {
      // Evaluate if the VP should be trusted
      console.log('HERE')
      if (isTrustedPresentation(presentation)) {
        log.info('Presentation verified')
      } else {
        log.info('Presentation not trusted')
        throw new Error('Presentation not trusted')
      }
    } else {
      log.info('Presentation invalid')
      throw new Error('Presentation invalid')
    }

    // Get the user claims
    const subject = presentation['verifiableCredential']['credentialSubject']['id']
    const login_id = presentation['proof']['challenge']

    const challenge = (await redis.get('' + login_id))!
    log.info(`Logging in: ${subject} with challenge: ${challenge}`)

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
              context: presentation.verifiableCredential,
            },
          })
          .then(({ data: body }) => {
            const MAX_AGE = 30 // 30 seconds
            const EXPIRY_MS = 'EX' // seconds

            // save the redirect address to redis for the browser
            redis.set('redirect' + login_id, String(body.redirect_to), EXPIRY_MS, MAX_AGE)
            // phone just gets a 200 ok
            return true
          }),
      )
      // This will handle any error that happens when making HTTP calls to hydra
      .catch((error: any) => {
        log.error(formatError(error))
        throw error
      })
  }
