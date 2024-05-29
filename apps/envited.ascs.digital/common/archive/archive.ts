import { BlobReader, Entry, Reader, ZipReader } from '@zip.js/zip.js'
import { find, propEq } from 'ramda'

import { BlobTypes } from '../types'

export const _extract =
  ({ ZipReader, BlobReader }: { ZipReader: any; BlobReader: any }) =>
  async (archive: File, fileName: string) => {
    const reader = new ZipReader(new BlobReader(archive))
    return reader
      .getEntries()
      .then((entries: Entry[]) => {
        if (entries.length === 0) {
          return []
        }
        return find(propEq(fileName, 'filename'))(entries)
      })
      .catch(() => undefined)
      .finally(() => reader.close())
  }

export const extract = _extract({ ZipReader, BlobReader })

export const read = async (entry: Entry) => {
  const stream = new TransformStream()
  entry.getData?.(stream.writable)

  return new Response(stream.readable).text()
}

export const _extractFromReadable =
  ({ ZipReader }: { ZipReader: any }) =>
  async (readable: BlobReader, fileName: string) => {
    const reader = new ZipReader(readable)
    return reader
      .getEntries()
      .then((entries: Entry[]) => {
        if (entries.length === 0) {
          return []
        }
        return find(propEq(fileName, 'filename'))(entries)
      })
      .catch(() => undefined)
      .finally(() => reader.close())
  }

export const extractFromReadable = _extractFromReadable({ ZipReader })

export const _extractFileFromBlob =
  ({ zipReader, blobReader }: { zipReader: any; blobReader: any }) =>
  async (blob: Blob, filename: string) => {
    const reader = new zipReader(new blobReader(blob))

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

export const extractFileFromBlob = _extractFileFromBlob({ zipReader: ZipReader, blobReader: BlobReader })

export const transfromByteArrayToBlob = (blob: Uint8Array, type: BlobTypes) => new Blob([blob], { type })
