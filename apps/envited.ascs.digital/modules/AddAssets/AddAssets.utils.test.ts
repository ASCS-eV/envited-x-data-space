import * as SUT  from './AddAssets.utils'

describe('modules/AddAssets/AddAssets.utils', () => {
  describe('_removeFile', () => {
    it('should return a FileList with files removed', () => {
      // when ... we want remove an item from the file list
      // then ... we should get the id as expected
      function DataTransfer(this: any) {
        this.files = []
        this.items = {
          add: (value: any) => {
            this.files.push(value);
          }
        }
      }

      const result = SUT._removeFile(new (DataTransfer as any)() as any)([0, 1, 2, 3] as any, 2)

      
      expect(result).toEqual([0, 1, 3])
    })
  })
  describe('_addFiles', () => {
    it('should return a FileList with new added files', () => {
      // when ... we want to add files to the file list
      // then ... it should update the file list as expected
      function DataTransfer(this: any) {
        this.files = []
        this.items = {
          add: (value: any) => {
            this.files.push(value);
          }
        }
      }

      const result = SUT._addFiles(new (DataTransfer as any)() as any)([0, 1] as any, [2, 3] as any)

      expect(result).toEqual([0, 1, 2, 3])
    })
  })
})
