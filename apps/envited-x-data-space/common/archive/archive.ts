import { BlobReader, Entry, ZipReader } from '@zip.js/zip.js'
import { find, propEq } from 'ramda'
import { Readable } from 'stream'
import { ReadableStream as WebReadableStream } from 'stream/web'

import { isBrowser } from '../utils/utils'
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
      .catch((e: unknown) => console.log('no entries found', e))
      .finally(() => reader.close())
  }

export const extract: (readable: BlobReader, filename: string) => Promise<Entry> = _extract({ ZipReader })

export const extractFromByteArray: (byteArray: Uint8Array, filename: string) => Promise<Entry> = async (
  byteArray: Uint8Array,
  filename: string,
) => extract(transformByteArrayToReadable(byteArray, BlobType.zip), filename)

export const extractFromFile = (file: File, filename: string) => extract(new BlobReader(file), filename)

export const read = async (entry: Entry) => {
  const stream = new TransformStream()
  entry.getData?.(stream.writable)

  return new Response(stream.readable).text()
}

export const stream = async (entry: Entry): Promise<Readable> => {
  try {
    if (!entry || !entry.getData) {
      const emptyStream = new Readable({
        read() {}, // eslint-disable-line @typescript-eslint/no-empty-function
      })
      emptyStream.push(null) // Signal end of stream
      return emptyStream
    }

    const webStream = new TransformStream()
    entry.getData(webStream.writable)

    if (!isBrowser) {
      const nodeStream = Readable.fromWeb(webStream.readable as unknown as WebReadableStream)
      return nodeStream
    }

    const reader = webStream.readable.getReader()

    return new Readable({
      async read() {
        const { done, value } = await reader.read()
        if (done) {
          this.push(null)
        } else {
          this.push(Buffer.from(value))
        }
      },
    })
  } catch (error) {
    console.error('Error in stream function:', error)
    throw error
  }
}

export const getFileBlob = async (entry: Entry) => {
  const stream = new TransformStream()
  entry.getData?.(stream.writable)

  return new Response(stream.readable).blob()
}

export const _readContentFromJsonFile =
  ({ read }: { read: (file: Entry) => Promise<string> }) =>
  async (file: Entry) =>
    read(file).then(JSON.parse)

export const readContentFromJsonFile = _readContentFromJsonFile({ read })

export const _countAmountOfFilesInZip =
  ({ ZipReader }: { ZipReader: any }) =>
  async (zipFile: Uint8Array) => {
    const reader = new ZipReader(new BlobReader(new Blob([zipFile])))

    return reader
      .getEntries()
      .then((entries: Entry[]) => entries.filter(entry => !entry.directory).length)
      .catch(() => undefined)
      .finally(() => reader.close())
  }

export const countAmountOfFilesInZip = _countAmountOfFilesInZip({ ZipReader })
