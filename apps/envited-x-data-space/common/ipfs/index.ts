import { PinataSDK } from 'pinata-web3'

import {
  createGroup as _createGroup,
  download as _download,
  uploadFileToIPFS as _uploadFileToIPFS,
  uploadJsonToIPFS as _uploadJsonToIPFS,
} from './ipfs'

export type UploadJson = ReturnType<typeof _uploadJsonToIPFS>
export type CreateGroup = ReturnType<typeof _createGroup>
export const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT || '',
  pinataGateway: process.env.PINATA_GATEWAY || '',
  pinataGatewayKey: process.env.PINATA_GATEWAY_KEY || '',
})

export const createGroup = _createGroup(pinata)

export const uploadFileToIPFS = _uploadFileToIPFS(pinata)

export const uploadJsonToIPFS = _uploadJsonToIPFS(pinata)

export const downloadFile = _download(pinata)
