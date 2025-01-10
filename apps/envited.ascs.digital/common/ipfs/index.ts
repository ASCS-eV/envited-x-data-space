import { PinataSDK } from 'pinata-web3'

import {
  createGroup as _createGroup,
  download as _download,
  uploadFile as _uploadFile,
  uploadJson as _uploadJson,
} from './ipfs'

export type UploadJson = ReturnType<typeof _uploadJson>
export type CreateGroup = ReturnType<typeof _createGroup>
export const pinata = new PinataSDK({
  pinataJwt:
    process.env.PINATA_JWT ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3ODY1NTQyMC1kYzM0LTRjMTQtODczYi05NjE4MmQwNDA2ZDciLCJlbWFpbCI6InBpbmF0YUBlbnZpdGVkLm1hcmtldCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxNGMxZTAyNzJlNzA3ODE0ZjcwNyIsInNjb3BlZEtleVNlY3JldCI6ImE2MzQ2N2VmMzc0ZmRjNzQ1Mzc2OTBmYjlkNjM3ODk1NjAyMzQ5Y2RmMDJkZGU2MTg2ZmFhOTllNGEwM2VhN2MiLCJleHAiOjE3NjQ2ODM4ODF9.Eu6nr-ZbpCYd4HuejxKCo4xG7qPoioJyBik6x3kJPm4',
  pinataGateway: process.env.PINATA_GATEWAY || 'plum-secret-aardwolf-688.mypinata.cloud',
  pinataGatewayKey:
    process.env.PINATA_GATEWAY_KEY || 'yCNvt4_psrxde9cshtn7vPtK5HujxSUYaRyNT5aVIu1l5eH2S7pUxSEl7UVQhF-4',
})

console.log(await pinata.gateways.get('bafybeief5r2xgciehzhx6c4kbooifsnbjpiifjei36lpi3kzcdmpr2wvue'))

export const createGroup = _createGroup(pinata)

export const uploadFile = _uploadFile(pinata)

export const uploadJson = _uploadJson(pinata)

export const downloadFile = _download(pinata)
