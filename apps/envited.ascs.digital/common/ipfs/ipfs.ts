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
  async ({ buffer, filename }: { buffer: Buffer; filename: string }) => {
    // const blob = new Blob([buffer])
    // const file = new File([blob], filename)

    return pinata.upload
      .file(buffer as any)
      .addMetadata({ name: filename })
      .then(data => console.log(data))
  }

export const createGroup = (pinata: PinataSDK) => async (groupName: string) => {
  const group = await pinata.groups.create({
    name: groupName,
  })

  return group.id
}
