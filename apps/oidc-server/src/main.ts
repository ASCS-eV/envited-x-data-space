import express from 'express'

import { helloWorld } from './handlers/helloWorld'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3000

const app = express()

app.get('/', (req, res) => {
  const result = helloWorld()
  res.send(result)
})

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`)
})
