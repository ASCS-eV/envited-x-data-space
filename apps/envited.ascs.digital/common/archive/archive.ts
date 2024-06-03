import { BlobReader, Entry, ZipReader } from '@zip.js/zip.js'
import { find, propEq } from 'ramda'

import { BlobTypes } from '../types'

export const _extract =
  ({ ZipReader }: { ZipReader: any }) =>
  async (readable: BlobReader, filename: string) => {
    try {
      const reader = new ZipReader(readable)

      return reader
        .getEntries()
        .then((entries: Entry[]) => {
          if (entries.length === 0) {
            return []
          }
          return find(propEq(filename, 'filename'))(entries)
        })
        .catch(() => undefined)
        .finally(() => reader.close())
    } catch (error) {
      return undefined
    }
  }

export const extract = _extract({ ZipReader })

export const read = async (entry: Entry) => {
  const stream = new TransformStream()
  entry.getData?.(stream.writable)

  return new Response(stream.readable).text()
}

export const _readContentFromJsonFile =
  ({ read }: { read: (file: Entry) => Promise<string> }) =>
  async (file: Entry) =>
    read(file).then(JSON.parse)

export const readContentFromJsonFile = _readContentFromJsonFile({ read })

export const extractFileFromZipByteArray = async (byteArray: Uint8Array, filename: string) =>
  extract(transformByteArrayToReadable(byteArray, BlobTypes.zip), filename)

export const extractFromZipFile = (zip: File, filename: string) => extract(new BlobReader(zip), filename)

export const transformByteArrayToBlob = (byteArray: Uint8Array, type: BlobTypes) => new Blob([byteArray], { type })

export const transformByteArrayToReadable = (byteArray: Uint8Array, type: BlobTypes) =>
  new BlobReader(transformByteArrayToBlob(byteArray, type))
