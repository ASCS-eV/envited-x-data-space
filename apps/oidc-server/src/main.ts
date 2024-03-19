import express from 'express'

import { getClientMetadata } from './handlers/clientMetadata/clientMetadata'
import { getPresentCredential } from './handlers/presentCredential/getPresentCredential'
import { postPresentCredential } from './handlers/presentCredential'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3005

const app = express()

app.get('/client-metadata', (req, res) => {
  const result = getClientMetadata()

  res.send(result)
})

app.get('/present-credential/:loginId', (req, res) => {
  const { loginId } = req.params
  const result = getPresentCredential(loginId)
  res.send(result)
})

app.post('/present-credential', (req, res) => {
  const result = postPresentCredential(() => {}, () => {})(req.body)
  res.send(result)
})

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`)
})
