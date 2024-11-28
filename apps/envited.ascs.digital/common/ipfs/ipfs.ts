import type { PinataSDK } from 'pinata-web3'
import { Readable } from 'stream'

export const uploadJson =
  (pinata: PinataSDK) =>
  async ({ data, filename, group = '' }: { data: object; filename: string; group?: string }) => {
    if (group) {
      return pinata.upload
        .json(data)
        .addMetadata({ name: filename })
        .group(group)
        .then(data => pinata.gateways.convert(data.IpfsHash))
    }

    return pinata.upload
      .json(data)
      .addMetadata({ name: filename })
      .then(data => pinata.gateways.convert(data.IpfsHash))
  }

export const uploadFile =
  (pinata: PinataSDK) =>
  async ({ arrayBuffer, filename }: { arrayBuffer: ArrayBuffer; filename: string }) => {
    console.log('uploadFile - input', arrayBuffer, filename)
    const buffer = Buffer.from(arrayBuffer)

    const readable = new Readable({
      read() {
        this.push(buffer)
        this.push(null)
      },
    })
    console.log('uploadFile - Readable()', readable)

    const result = await pinata.upload
      .stream(readable)
      .addMetadata({ name: filename })
      .then(data => pinata.gateways.convert(data.IpfsHash))

    console.log('uploadFile - result', result)

    return result
  }

export const createGroup = (pinata: PinataSDK) => async (groupName: string) => {
  const group = await pinata.groups.create({
    name: groupName,
  })

  return group.id
}
