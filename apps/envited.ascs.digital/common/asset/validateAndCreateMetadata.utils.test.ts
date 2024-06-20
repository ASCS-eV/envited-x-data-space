import fs from 'fs'

import * as SUT from './validateAndCreateMetadata.utils'

describe('common/asset/validateAndCreateMetadata.utils', () => {
  describe('createFilename', () => {
    it('should create a filename', async () => {
      const assetFile = `${process.cwd()}/apps/envited.ascs.digital/common/fixtures/ContainerJSONLd.zip`
      const buffer = fs.readFileSync(assetFile)
      const byteArray = new Uint8Array(buffer, 0, 16)

      const jsonStub = {
        encode: jest.fn(),
        code: jest.fn,
      } as any

      const sha256Stub = {
        digest: jest.fn(),
      } as any

      const CIDStub = {
        create: jest.fn().mockReturnValue({
          toString: jest.fn().mockReturnValue('HASH'),
        }),
      } as any

      const result = await SUT._createFilename({
        json: jsonStub,
        sha256: sha256Stub,
        CID: CIDStub,
      })(byteArray as any)

      expect(result).toBe('HASH')
    })
  })
})
