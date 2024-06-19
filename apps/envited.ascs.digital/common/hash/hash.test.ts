import fs from 'fs'

import * as SUT from './hash'

describe('common/hash', () => {
  describe('hashFile', () => {
    it('should validate and return a metadata buffer', async () => {
      const assetFile = `${process.cwd()}/apps/envited.ascs.digital/common/fixtures/ContainerJSONLd.zip`
      const buffer = fs.readFileSync(assetFile)
      const byteArray = new Uint8Array(buffer, 0, 16)

      console.log(byteArray)

      await SUT.hashFile(byteArray as any)
      // console.log(result)
    })
  })
})
