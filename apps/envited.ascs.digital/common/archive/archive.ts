import { BlobReader, Entry, ZipReader } from '@zip.js/zip.js'
import { find, propEq } from 'ramda'

import { transformByteArrayToReadable } from './archive.utils'
import { BlobType } from './types'

export const _extract =
  ({ ZipReader }: { ZipReader: any }) =>
  async (readable: BlobReader, filename: string) => {
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
  }

export const extract = _extract({ ZipReader })

export const extractFromByteArray = async (byteArray: Uint8Array, filename: string) =>
  extract(transformByteArrayToReadable(byteArray, BlobType.zip), filename)

export const extractFromFile = (file: File, filename: string) => extract(new BlobReader(file), filename)

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
