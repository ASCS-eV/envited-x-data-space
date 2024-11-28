import type { PinataSDK } from 'pinata-web3'

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
    const blob = new Blob([Buffer.from(arrayBuffer)])
    const stream = blob.stream()
    console.log('uploadFile - blob.stream()', stream)
    // const file = new File([blob], filename)
    const readableStream = new ReadableStream({
      start(controller) {
        controller.enqueue(arrayBuffer)
        controller.close()
      },
    })
    console.log('uploadFile - readableStream', readableStream)

    return (
      pinata.upload
        .stream(readableStream as any)
        // .stream(stream as any)
        // .file(buffer as any)
        .addMetadata({ name: filename })
        .then(data => console.log(data))
    )
  }

export const createGroup = (pinata: PinataSDK) => async (groupName: string) => {
  const group = await pinata.groups.create({
    name: groupName,
  })

  return group.id
}
