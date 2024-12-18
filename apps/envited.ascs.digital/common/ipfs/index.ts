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
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.PINATA_GATEWAY}`,
  pinataGatewayKey: `${process.env.PINATA_GATEWAY_KEY}`,
})

export const createGroup = _createGroup(pinata)

export const uploadFile = _uploadFile(pinata)

export const uploadJson = _uploadJson(pinata)

export const downloadFile = _download(pinata)
