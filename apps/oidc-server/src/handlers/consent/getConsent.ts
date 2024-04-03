/**
 * Copyright 2024 Software Engineering for Business Information Systems (sebis) <matthes@tum.de> .
 * SPDX-License-Identifier: MIT
 */
import { Redis } from 'ioredis'

import { HydraAdmin } from '../../types'

export const getConsent = (redis: Redis, hydraAdmin: HydraAdmin) => async (challenge: string) => {
  console.log("CONSENT")
  try {
    const { data: body } = await hydraAdmin.oauth2.getOAuth2ConsentRequest({ consentChallenge: challenge })
    console.log(challenge)
    // get user identity and fetch user claims from redis
    const userClaims = JSON.parse((await redis.get('' + body.subject))!)
    console.log(userClaims)
    return hydraAdmin.oauth2
      .acceptOAuth2ConsentRequest({
        consentChallenge: challenge,
        // We can grant all scopes that have been requested - hydra already checked for us that no additional scopes
        // are requested accidentally.
        acceptOAuth2ConsentRequest: {
          grant_scope: body.requested_scope,

          session: {
            access_token: userClaims.tokenAccess,
            id_token: userClaims.tokenId,
          },

          // ORY Hydra checks if requested audiences are allowed by the client, so we can simply echo this.
          grant_access_token_audience: body.requested_access_token_audience,

          // This tells hydra to remember this consent request and allow the same client to request the same
          // scopes from the same user, without showing the UI, in the future.
          remember: Boolean(false),

          // When this "remember" sesion expires, in seconds. Set this to 0 so it will never expire.
          remember_for: 3600,
        },
      })
      .then(({ data: body }) => {
        // All we need to do now is to redirect the user back to hydra!
        return body.redirect_to
      })
  } catch (e) {
    return e.message
  }
}
