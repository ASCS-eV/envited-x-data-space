import { BlobReader } from '@zip.js/zip.js'

import { BlobTypes } from './types'

export const _transformByteArrayToBlob = (blob: typeof Blob) => (byteArray: Uint8Array, type: BlobTypes) =>
  new blob([byteArray], { type })

export const transformByteArrayToBlob = _transformByteArrayToBlob(Blob)

export const _transformByteArrayToReadable =
  ({
    BlobReader,
    transformByteArrayToBlob,
  }: {
    BlobReader: any
    transformByteArrayToBlob: (byteArray: Uint8Array, type: BlobTypes) => Blob
  }) =>
  (byteArray: Uint8Array, type: BlobTypes) =>
    new BlobReader(transformByteArrayToBlob(byteArray, type))

export const transformByteArrayToReadable = _transformByteArrayToReadable({ BlobReader, transformByteArrayToBlob })
