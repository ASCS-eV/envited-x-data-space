import { checkIfAllAssetsAreValid } from './AddAssets.utils'

describe('modules/AddAssets.utils', () => {
  describe('render', () => {
    it.each([
      [[true, false], false],
      [[true, true], true],
    ])('should, with value %s, return %s as expected', (array, result) => {
      // when ... rendering component
      // then ... should render with expected properties
      expect(checkIfAllAssetsAreValid(array)).toBe(result)
    })
  })
})
