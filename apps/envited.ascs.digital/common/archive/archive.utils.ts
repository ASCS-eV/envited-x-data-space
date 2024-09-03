import { BlobReader } from '@zip.js/zip.js'

import { BlobType } from './types'

export const _transformByteArrayToBlob = (blob: typeof Blob) => (byteArray: Uint8Array, type: BlobType) =>
  new blob([byteArray], { type })

export const transformByteArrayToBlob = _transformByteArrayToBlob(Blob)

export const _transformByteArrayToReadable =
  ({
    BlobReader,
    transformByteArrayToBlob,
  }: {
    BlobReader: any
    transformByteArrayToBlob: (byteArray: Uint8Array, type: BlobType) => Blob
  }) =>
  (byteArray: Uint8Array, type: BlobType) =>
    new BlobReader(transformByteArrayToBlob(byteArray, type))

export const transformByteArrayToReadable = _transformByteArrayToReadable({ BlobReader, transformByteArrayToBlob })
