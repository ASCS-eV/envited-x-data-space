import fs from 'fs'
import ValidationReport from 'rdf-validate-shacl/src/validation-report'

import { extractFromByteArray, read } from '../archive'
import { AssetMetadata } from '../types'
import { validateShaclDataWithSchema } from '../validator'
import { SCHEMA_MAP } from '../validator/shacl/shacl.constants'
import { Schemas } from '../validator/shacl/shacl.types'
import { createFilename } from './validateAndCreateMetadata.utils'

export const getFileFromByteArray = async (byteArray: Uint8Array, filename: string) =>
  extractFromByteArray(byteArray, filename).then(read)

export const createMetadata = ({ name }: { name: string }) => {
  const metadata = {
    decimals: 0,
    isBooleanAmount: true,
    name: 'Carnival Asada',
    description:
      "Deceptively simple by reputation; don't underestimate this cunning taco. It's packing a secret weapon!",
    minter: 'tz1codeYURj5z49HKX9zmLHms2vJN2qDjrtt',
    creators: ['CryptoTacos, Inc.'],
    date: '2020-11-13T00:00:00+00:00',
    type: 'Digital Taco',
    tags: ['CryptoTaco', 'taco', 'collectibles'],
    language: 'en',
    artifactUri: 'https://ta.co/1832674.gltf',
    displayUri: 'https://ta.co/1832674.svg',
    thumbnailUri: 'https://ta.co/1832674.svg',
    externalUri: 'https://ta.co/',
    formats: [
      {
        uri: 'https://ta.co/1832674.svg',
        hash: 'a56017a1317b1bc900acdaf600874c00e5c048d30894f452049db6dcef6e4f0d',
        mimeType: 'image/svg+xml',
      },
      {
        uri: 'https://ta.co/1832674.png',
        hash: '8968db6bde43255876c464613a31fbd0416ca7d74be4c5ae86c1450418528302',
        mimeType: 'image/png',
        dimensions: {
          value: '512x512',
          unit: 'px',
        },
      },
      {
        uri: 'https://ta.co/1832674.gltf',
        hash: 'd4a93fc8d8991caa9b52c04c5ff7edf5c4bc29317a373e3a97f1398c697d6714',
        mimeType: 'model/gltf+json',
      },
    ],
    attributes: [
      {
        name: 'filling',
        value: 'carne asada',
        type: '',
      },
    ],
  }
  const asset = {
    description: '',
    minter: '',
    creators: [''],
    contributors: [''],
    publishers: [''],
    date: '',
    blockLevel: 0,
    type: '',
    tags: ['tag_1'],
    genres: ['genre_1'],
    identifier: '',
    rights: '',
    rightUri: '',
    artifactUri: '',
    displayUri: '',
    thumbnailUri: '',
    externalUri: '',
    isTransferable: true,
    isBooleanAmount: false,
    shouldPreferSymbol: false,
    ttl: 0,
    formats: ['type_format'],
  }

  const attribute = {
    name: 'Base',
    value: 'Starfish', // '1', '1.4', '5'
    type: 'integer', // integer percentage, number
  }

  return {
    name,
    symbol: 'ENVITED',
    decimals: 2,
    shouldPreferSymbol: true,
    thumbnailUri: 'THUMBNAIL_URI',
    attributes: [attribute],
    assets: [],
  }
}

export const _getShaclSchemaAndValidate =
  ({
    getFileFromByteArray,
    validateShaclDataWithSchema,
    fs,
  }: {
    getFileFromByteArray: (byteArray: Uint8Array, filename: string) => any
    validateShaclDataWithSchema: (
      data: string,
      stream: NodeJS.ReadableStream,
    ) => Promise<
      | ValidationReport<any>
      | {
          conforms: boolean
        }
    >
    fs: any
  }) =>
  async (byteArray: Uint8Array, filename: string) => {
    try {
      const data = await getFileFromByteArray(byteArray, filename)
      const shaclData = JSON.parse(data)
      const type = shaclData['@type'] as Schemas
      const schema = fs.createReadStream(`${__dirname}/schemas/${SCHEMA_MAP[type]}`)

      const report = await validateShaclDataWithSchema(data, schema)

      return {
        data: shaclData,
        report,
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

export const getShaclSchemaAndValidate = _getShaclSchemaAndValidate({
  getFileFromByteArray,
  validateShaclDataWithSchema,
  fs,
})

export const _validateAndCreateMetadata =
  ({
    getShaclSchemaAndValidate,
    createMetadata,
    createFilename,
  }: {
    getShaclSchemaAndValidate: (byteArray: Uint8Array, filename: string) => Promise<any>
    createMetadata: ({ name }: { name: string }) => AssetMetadata
    createFilename: (byteArray: Uint8Array) => Promise<string>
  }) =>
  async (byteArray: Uint8Array, filename: string) => {
    try {
      const { report, data } = await getShaclSchemaAndValidate(byteArray, filename)
      const metadata = createMetadata({ name: data.name[0] as string })

      const assetCID = await createFilename(byteArray)
      const metadataCID = await createFilename(metadata as any)

      return {
        report,
        metadata,
        assetCID,
        metadataCID,
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }

export const validateAndCreateMetadata = _validateAndCreateMetadata({
  getShaclSchemaAndValidate,
  createMetadata,
  createFilename,
})
