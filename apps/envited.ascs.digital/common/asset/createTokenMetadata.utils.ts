import { last, split } from 'ramda'

export const formatAssetUri = (CID: string) => `https://assets.envited-x.net/${CID}`

export const formatMetadataUri = (CID: string) => `https://metadata.envited-x.net/${CID}`

export const formatIpfsUri = (CID: string) => `ipfs://${CID}`

export const extractFilenameFromPath = (path: string) => last(split('/')(path))
