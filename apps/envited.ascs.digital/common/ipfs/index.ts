import { PinataSDK } from 'pinata-web3'

import { createGroup as _createGroup, uploadJson as _uploadJson } from './ipfs'

export type UploadJson = ReturnType<typeof _uploadJson>
export type CreateGroup = ReturnType<typeof _createGroup>

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.PINATA_GATEWAY}`,
})

export const createGroup = _createGroup(pinata)

export const uploadJson = _uploadJson(pinata)
