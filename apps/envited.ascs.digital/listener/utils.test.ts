import * as SUT from './utils'

describe.skip('listener/utils', () => {
  describe('extractAttributesUri', () => {
    it('should return an empty array if the attributes array is empty', () => {
      // when ... we want to extract the attributes uri
      // then ... it should extract the attributes uri as expected

      const attributes = [
        {
          name: 'ASSET_NAME.ASSET_TYPE',
          value: 'ASSET_URI',
          type: 'uri',
        },
        {
          name: 'ASSET_NAME.ASSET_TYPE',
          value: 'ASSET_IPFS_URI',
          type: 'application/json',
        },
        {
          name: 'ASSET_NAME.manifest',
          value: 'ASSET_DEFINITION_URI',
          type: 'uri',
        },
        {
          name: 'ASSET_NAME.manifest',
          value: 'ASSET_MANIFEST_IFPS_URI',
          type: 'application/json',
        },
      ]

      const expected = 'ASSET_IPFS_URI'

      const result = SUT.extractAttributesUri(attributes)

      expect(result).toEqual(expected)
    })
  })
})
