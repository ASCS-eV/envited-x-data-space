import domainMetadata from '../fixtures/domainMetadata.json'
import { ASSET_TYPE } from './createTokenMetadata.constants'
import * as SUT from './createTokenMetadata.utils'
import { MetadataType } from './types'

describe('common/asset/createTokenMetadata.utils', () => {
  describe('extractGeneralInformationFromMetadata', () => {
    it('should extract general information from metadata', async () => {
      // when ... we want to extact general information from the metadata
      // then ... it should return name, description, formatType and the version
      const expected = {
        name: 'TestfeldNiedersachsen_ALKS_ODR_sample',
        description: 'simple hdmap example file on Testfeld Niedersachsen for ALKS scenario',
        formatType: 'ASAM OpenDRIVE',
        version: '1.6',
      }

      const result = await SUT.extractGeneralInformationFromMetadata(
        ASSET_TYPE[domainMetadata['@type'] as MetadataType],
      )(domainMetadata)

      expect(result).toEqual(expected)
    })
  })
})
