import { ERRORS } from '../../constants'
import { Role } from '../../types'
import { badRequestError, forbiddenError, notFoundError, unauthorizedError } from '../../utils'
import * as SUT from './delete'

describe('serverActions/assets/delete', () => {
  describe('deleteAsset', () => {
    it('should delete the asset successfully when user owns it', async () => {
      const userId = 'USER_PKH'
      const assetId = 'ASSET_ID'
      const logStub = {
        error: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
      }

      const getServerSessionStub = jest.fn().mockResolvedValue({
        user: {
          id: userId,
          pkh: userId,
          role: Role.principal,
        },
      })

      const deleteAssetStub = jest.fn().mockResolvedValue(true)
      const dbStub = jest.fn().mockResolvedValue({
        getAsset: jest.fn().mockResolvedValue([
          {
            id: assetId,
            userId,
          },
        ]),
        deleteAsset: deleteAssetStub,
      })

      const result = await SUT.deleteAsset({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(
        assetId,
      )

      expect(result).toBe(true)
      expect(deleteAssetStub).toHaveBeenCalledWith(assetId)
    })

    it('should throw badRequestError when asset id is missing', async () => {
      const logStub = {
        error: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
      }
      const getServerSessionStub = jest.fn()
      const dbStub = jest.fn()

      await expect(
        SUT.deleteAsset({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(''),
      ).rejects.toEqual(badRequestError({ resource: 'assets', resourceId: '', message: 'Missing ID' }))

      expect(dbStub).not.toHaveBeenCalled()
    })

    it('should throw unauthorizedError when user is not authenticated', async () => {
      const logStub = {
        error: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
      }
      const getServerSessionStub = jest.fn().mockResolvedValue(null)
      const dbStub = jest.fn()

      await expect(
        SUT.deleteAsset({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })('ASSET_ID'),
      ).rejects.toEqual(unauthorizedError({ resource: 'users' }))

      expect(dbStub).not.toHaveBeenCalled()
    })

    it('should throw notFoundError when asset does not exist', async () => {
      const userId = 'USER_PKH'
      const assetId = 'NONEXISTENT_ASSET_ID'
      const logStub = {
        error: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
      }

      const getServerSessionStub = jest.fn().mockResolvedValue({
        user: {
          id: userId,
          pkh: userId,
          role: Role.principal,
        },
      })

      const dbStub = jest.fn().mockResolvedValue({
        getAsset: jest.fn().mockResolvedValue([]),
      })

      await expect(
        SUT.deleteAsset({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(assetId),
      ).rejects.toEqual(notFoundError({ resource: 'assets', resourceId: assetId, userId }))
    })

    it('should throw forbiddenError when user does not own the asset', async () => {
      const userId = 'USER_PKH'
      const assetId = 'ASSET_ID'
      const otherUserId = 'OTHER_USER_PKH'
      const logStub = {
        error: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
      }

      const getServerSessionStub = jest.fn().mockResolvedValue({
        user: {
          id: userId,
          pkh: userId,
          role: Role.principal,
        },
      })

      const dbStub = jest.fn().mockResolvedValue({
        getAsset: jest.fn().mockResolvedValue([
          {
            id: assetId,
            owner: otherUserId,
          },
        ]),
      })

      await expect(
        SUT.deleteAsset({ db: dbStub, getServerSession: getServerSessionStub, log: logStub })(assetId),
      ).rejects.toEqual(
        forbiddenError({
          resource: 'assets',
          resourceId: assetId,
          message: ERRORS.NOT_ALLOWED_TO_DELETE_ASSET,
          userId,
        }),
      )
    })
  })
})
