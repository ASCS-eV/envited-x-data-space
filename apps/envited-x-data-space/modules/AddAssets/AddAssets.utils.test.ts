import { UploadStatus } from 'apps/envited-x-data-space/common/types'

import * as SUT from './AddAssets.utils'

describe('modules/AddAssets/AddAssets.utils', () => {
  describe('_removeFile', () => {
    it('should return a FileList with files removed', () => {
      // when ... we want remove an item from the file list
      // then ... we should get the id as expected
      function DataTransfer(this: any) {
        this.files = []
        this.items = {
          add: (value: any) => {
            this.files.push(value)
          },
        }
      }

      const result = SUT._removeFile(new (DataTransfer as any)() as any)([0, 1, 2, 3] as any, 2)

      expect(result).toEqual([0, 1, 3])
    })
  })

  describe('addFiles', () => {
    it('should return a FileList with new added files', () => {
      // when ... we want to add files to the file list
      // then ... it should update the file list as expected
      const result = SUT.addFiles([0, 1] as any, [2, 3] as any)

      expect(result).toEqual([0, 1, 2, 3])
    })
  })

  describe('_createDataTransferFromFileList', () => {
    it('should return a new DataTransfer with Files', () => {
      // when ... we want to add files to the file list
      // then ... it should update the file list as expected
      function DataTransfer(this: any) {
        this.files = []
        this.items = {
          add: (value: any) => {
            this.files.push(value)
          },
        }
      }

      const cryptoStub = {
        randomUUID: () => 'RANDOM-UUID',
      }

      const result = SUT._createDataTransferFromFileList(new (DataTransfer as any)() as any)([0, 1, 2, 3] as any)

      expect(result).toEqual([0, 1, 2, 3])

      /*
      expect(result).toEqual([
        {
          file: 0,
          id: 'RANDOM-UUID',
        },
        {
          file: 1,
          id: 'RANDOM-UUID',
        },
        {
          file: 2,
          id: 'RANDOM-UUID',
        },
        {
          file: 3,
          id: 'RANDOM-UUID',
        },
      ])
      */
    })
  })

  describe('addIdToFileList', () => {
    it('should return a FileList with Ids', () => {
      // when ... we we have a FileList
      // then ... it should add and id to each file
      global.crypto.randomUUID = jest.fn().mockReturnValue('RANDOM-UUID')

      const result = SUT.addIdToFileList([0, 1, 2, 3] as any)

      expect(result).toEqual([
        {
          file: 0,
          id: 'RANDOM-UUID',
        },
        {
          file: 1,
          id: 'RANDOM-UUID',
        },
        {
          file: 2,
          id: 'RANDOM-UUID',
        },
        {
          file: 3,
          id: 'RANDOM-UUID',
        },
      ])
    })
  })

  describe('allStatus', () => {
    it.each([
      [UploadStatus.uploaded, [{ status: UploadStatus.uploaded }, { status: UploadStatus.uploaded }], true],
      [UploadStatus.uploaded, [{ status: UploadStatus.uploading }, { status: UploadStatus.uploaded }], false],
      [UploadStatus.uploaded, [{ status: UploadStatus.error }, { status: UploadStatus.uploaded }], false],
    ])('should, with value %s, return %s as expected', (status, array, result) => {
      // when ... rendering component
      // then ... should render with expected properties
      expect(SUT.allStatus(status)(array)).toBe(result)
    })
  })

  describe('allStatus', () => {
    it.each([
      [UploadStatus.error, [{ status: UploadStatus.uploaded }, { status: UploadStatus.uploaded }], false],
      [UploadStatus.error, [{ status: UploadStatus.error }, { status: UploadStatus.uploaded }], true],
    ])('should, with value %s, return %s as expected', (status, array, result) => {
      // when ... rendering component
      // then ... should render with expected properties
      expect(SUT.anyStatus(status)(array)).toBe(result)
    })
  })
})
