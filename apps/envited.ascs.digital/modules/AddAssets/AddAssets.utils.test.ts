import { _addFiles } from './AddAssets.utils'

describe('modules/AddAssets/AddAssets.utils', () => {
  describe('_addFiles', () => {
    it('should return a FileList with new added files', () => {
      const dataTransfer = {
        items: {
          add: (x: any) => x,
        },
        files: [0, 1, 2, 3],
      }

      // when ... we want to get the id from the credential
      // then ... we should get the id as expected
      const result = _addFiles(dataTransfer as any)([0, 1] as any)([2, 3] as any)

      expect(result).toEqual([0, 1, 2, 3])
    })
  })
})
