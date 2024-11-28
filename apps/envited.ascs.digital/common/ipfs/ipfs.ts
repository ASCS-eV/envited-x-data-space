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
    const buffer = Buffer.from(arrayBuffer)
    const blob = new Blob([buffer])
    const stream = blob.stream()
    console.log('uploadFile - blob.stream()', stream)
    // const file = new File([blob], filename)

    const readable = new Readable({
      read() {
        this.push(buffer)
        this.push(null)
      },
    })
    console.log('uploadFile - Readable()', readable)

    const readableStream = new ReadableStream({
      start(controller) {
        controller.enqueue(arrayBuffer)
        controller.close()
      },
    })
    console.log('uploadFile - ReadableStream', readableStream)

    const result = await pinata.upload.stream(readable)
    // .stream(readableStream as any)
    // .stream(stream as any)
    // .file(buffer as any)
    .addMetadata({ name: filename })

    console.log(result)

    return result
  }

export const createGroup = (pinata: PinataSDK) => async (groupName: string) => {
  const group = await pinata.groups.create({
    name: groupName,
  })

  return group.id
}
