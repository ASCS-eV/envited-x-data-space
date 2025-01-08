import type { PinataSDK } from 'pinata-web3'
import { prop } from 'ramda'

export const uploadJson =
  (pinata: PinataSDK) =>
  async ({ data, filename, group = '' }: { data: object; filename: string; group?: string }) => {
    if (group) {
      return pinata.upload.json(data).addMetadata({ name: filename }).group(group).then(prop('IpfsHash'))
    }

    return pinata.upload.json(data).addMetadata({ name: filename }).then(prop('IpfsHash'))
  }

export const uploadFile =
  (pinata: PinataSDK) =>
  async ({ arrayBuffer, filename, group = '' }: { arrayBuffer: ArrayBuffer; filename: string; group?: string }) => {
    console.log('PINATA', arrayBuffer, filename, new File([arrayBuffer], filename))
    if (group) {
      return pinata.upload
        .file(new File([arrayBuffer], filename))
        .addMetadata({ name: filename })
        .group(group)
        .then(prop('IpfsHash'))
    }

    return pinata.upload
      .file(new File([arrayBuffer], filename))
      .addMetadata({ name: filename })
      .then(prop('IpfsHash'))
  }

export const createGroup = (pinata: PinataSDK) => async (groupName: string) => {
  const group = await pinata.groups.create({
    name: groupName,
  })
  return group.id
}

export const download = (pinata: PinataSDK) => pinata.gateways.get
