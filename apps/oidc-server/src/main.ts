import express from 'express'

import { getClientMetadata } from './handlers/clientMetadata'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3005

const app = express()

app.get('/client-metadata', (req, res) => {
  const result = getClientMetadata()

  res.send(result)
})

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`)
})
