import { TezosToolkit } from '@taquito/taquito'
import { Tzip12Module, tzip12 } from '@taquito/tzip12'

interface TokenMetadata {
  token_id: number
  decimals: number
  isBooleanAmount?: true
  name?: string
  description?: string
  tags?: string[]
  minter?: string
  creators?: string[]
  publishers?: string[]
  date?: string
  type?: string
  rights?: string
  rightsUri?: string
  language?: string
  artifactUri?: string
  identifier?: string
  externalUri?: string
  displayUri?: string
  formats?: {
    uri: string
    hash: string
    mimeType: string
    fileSize: number
    fileName: string
  }[]
  attributes?: {
    name: string
    value: string
    type: string
  }[]
}

export const getTokenMetadata =
  ({ tezos }: { tezos: TezosToolkit }) =>
  async (contractAddress: string, id: number): Promise<TokenMetadata | undefined> => {
    tezos.addExtension(new Tzip12Module())

    try {
      const contract = await tezos.contract.at(contractAddress, tzip12)
      return contract.tzip12().getTokenMetadata(id)
    } catch (e) {
      console.warn(e)
    }
  }
