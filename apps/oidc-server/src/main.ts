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
import { verifyUser } from './handlers/verifyUser/verifyUser'

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
  console.log('verify user - req', req.body)
  const { id, pkh, issuer, type } = req.body
  const result = await verifyUser(
    id, //'urn:uuid:0bc4ae81-1da3-4d3f-8b95-d2336cb4cabf',
    pkh,
    issuer, //'tz1Kj1XAEhrcuPS3rvZ8BGsUGDjv78ykEkEi',
    type,
  )
  res.send(result)
})

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`)
})
