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

export const createGroup = (pinata: PinataSDK) => async (groupName: string) => {
  const group = await pinata.groups.create({
    name: groupName,
  })

  return group.id
}
