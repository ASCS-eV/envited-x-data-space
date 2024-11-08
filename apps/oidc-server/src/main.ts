import { keyToDID, keyToVerificationMethod } from '@spruceid/didkit-wasm-node'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

import { redis } from './common'
import { hydraAdmin } from './common/hydra'
import { importJWK, signJWT } from './common/jose'
import { log } from './common/logger'
import { getChallenge } from './handlers/challenge'
import { getClientMetadata } from './handlers/clientMetadata'
import { getConsent } from './handlers/consent'
import { getPresentCredential, postPresentCredential } from './handlers/presentCredential'
import { getRedirect } from './handlers/redirect'
import { postVerifyUser } from './handlers/verifyUser'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 5002

const app = express()
app.use(cors())
app.use(bodyParser.json())

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/client-metadata', (req, res) => {
  const result = getClientMetadata()
  res.send(result)
})

app.get('/present-credential', async (req, res) => {
  const { login_id: loginId } = req.query
  const result = await getPresentCredential({ log, importJWK, signJWT, keyToDID, keyToVerificationMethod })(
    loginId as string,
  )
  res.send(result)
})

app.post('/present-credential', urlencodedParser, async (req, res) => {
  const result = await postPresentCredential({ redis, hydraAdmin, log })(JSON.parse(req.body.vp_token))
  res.send(result)
})

app.get('/consent', async (req, res) => {
  const result = await getConsent({ hydraAdmin, log })(req.query.consent_challenge as string)
  res.redirect(result)
})

app.get('/challenge/:challenge', async (req, res) => {
  const result = await getChallenge({ redis, keyToDID, log })(req.params.challenge)
  res.send(result)
})

app.get('/redirect/:loginId', async (req, res) => {
  const result = await getRedirect({ redis })(req.params.loginId)
  res.send(result)
})

app.post('/verify-user', async (req, res) => {
  const { id, pkh, issuer, type } = req.body
  const result = await postVerifyUser(id, pkh, issuer, type)
  res.send(result)
})

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`)
})
