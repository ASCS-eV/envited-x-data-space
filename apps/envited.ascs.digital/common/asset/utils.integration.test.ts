import { getAsset } from 'apps/envited.ascs.digital/modules/UploadedAsset/UploadedAsset.actions'
import { prop } from 'ramda'

import { readFile } from '../aws'
import { pinata, uploadFile } from '../ipfs'
import { createFilename } from './utils'
import { getShaclSchemaAndValidate, validateAndCreateMetadata } from './validateAndCreateMetadata'
import { getFileBlob } from '../archive/archive'
import { BlobReader } from '@zip.js/zip.js'
import { CID } from 'multiformats/cid'
import * as raw from 'multiformats/codecs/raw'
import { Hasher } from 'multiformats/dist/src/hashes/hasher'
import { sha256 } from 'multiformats/hashes/sha2'

describe('common/asset/utils', () => {
  describe('createFilename', () => {
    it('should create a valid CID from a byte array', async () => {
      // Create a sample byte array
      const testData = new TextEncoder().encode('Hello, World!')

      // Generate CID
      const cid = await createFilename(testData)

      // Verify the result is a valid CID string
      expect(cid).toBeDefined()
      expect(typeof cid).toBe('string')
      expect(cid).toMatch(/^bafkr/) // CID v1 with raw codec starts with 'bafkr'
    })

    it('should create consistent CIDs for identical content', async () => {
      const data1 = new TextEncoder().encode('Same content')
      const data2 = new TextEncoder().encode('Same content')

      const cid1 = await createFilename(data1)
      const cid2 = await createFilename(data2)

      expect(cid1).toBe(cid2)
    })

    it('should create different CIDs for different content', async () => {
      const data1 = new TextEncoder().encode('Content 1')
      const data2 = new TextEncoder().encode('Content 2')

      const cid1 = await createFilename(data1)
      const cid2 = await createFilename(data2)

      expect(cid1).not.toBe(cid2)
    })

    it('should handle empty byte array', async () => {
      const emptyData = new Uint8Array(0)

      const cid = await createFilename(emptyData)

      expect(cid).toBeDefined()
      expect(typeof cid).toBe('string')
    })

    it('should handle large byte arrays', async () => {
      // Create a larger byte array (100KB)
      const largeData = new Uint8Array(102400).fill(1)

      const cid = await createFilename(largeData)

      expect(cid).toBeDefined()
      expect(typeof cid).toBe('string')
    })

    it('should create the same CID as pinata', async () => {
      // Create a sample byte array
      const testData = new TextEncoder().encode(
        JSON.stringify({
          name: 'did:web:registry.gaia-x.eu:HdMap:wDgNY3gZAxMe3LjhdAZ9TbPiYnQ-yybNhCu8',
          symbol: 'ENVITED',
          decimals: 2,
          shouldPreferSymbol: true,
          thumbnailUri: 'THUMBNAIL_URI',
          attributes: [],
          assets: [],
        }),
      )

      // Generate CID
      const cid = await createFilename(testData)

      // Verify the result is a valid CID string
      expect(cid).toBeDefined()
      expect(typeof cid).toBe('string')
      expect(cid).toMatch('bafkreigdlsyni2wjmihwrotlmhficmbnspltfiuwbo476e7x45eojntzha') // CID v1 with raw codec starts with 'bafkr'
    })

    it.only('should create the same CID as pinata from a file', async () => {
      // Create a sample byte array
      const Key = 'bafkreifn25c5s4nyh6nqhs242r4eumyy7p27titowkbcy47qy5g3rzzpc4/bafkreib4ebmyrxuomnkhcuugkwshelm7twc6j55f5qutcfyzmjwf54lg5y'
      const { Body } = await readFile({
        Bucket: 'staging-envitedascsdigital-envi-ipfsbucket72ccbc1e-l3lceunn2dnx',
        Key,
      })
      const uploadedFile = await Body.transformToByteArray()
      // const { conforms, reports, data } = await getShaclSchemaAndValidate(uploadedFile)
      const filename = 'TestfeldNiedersachsen_ALKS_ODR_sample_01.png'
      console.log(uploadedFile.buffer)
      const file = new File([uploadedFile.buffer], filename)

      // const pu = await pinata.upload
      //   .file(file)
      //   .addMetadata({ name: filename })
      //   .then(prop('IpfsHash'))

      // console.log(pu)
      // console.log(a)
      // console.log(file)

      // const b = await file.arrayBuffer()
      // console.log(b)
      // Generate CID

      const rawBytes = raw.encode(uploadedFile)
      const hash = await sha256.digest(rawBytes)
      const cid = CID.create(1, raw.code, hash)

      const cidString = cid.toString()
      console.log(cidString)

      // Verify the result is a valid CID string
      // expect(cid).toBeDefined()
      // expect(typeof cid).toBe('string')
      // expect(cid).toMatch('bafkreigdlsyni2wjmihwrotlmhficmbnspltfiuwbo476e7x45eojntzha') // CID v1 with raw codec starts with 'bafkr'
    })
  })
})
