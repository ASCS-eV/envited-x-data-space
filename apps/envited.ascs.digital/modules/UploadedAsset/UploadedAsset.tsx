'use client'

import { LoadingIndicator } from '@envited-x-data-space/design-system'
import { TrashIcon } from '@heroicons/react/24/outline'
import { truncateCID } from 'apps/envited.ascs.digital/common/utils'
import { useSession } from 'next-auth/react'
import { equals, propOr } from 'ramda'
import { FC, useEffect, useState } from 'react'
import { match } from 'ts-pattern'

import { useTranslation } from '../../common/i18n'
import { useNotification } from '../../common/notifications'
import { Asset, AssetMetadata, AssetStatus } from '../../common/types'
import { Mint } from '../Mint'
import { deleteAsset, getAsset } from './UploadedAsset.actions'

interface UploadedAssetProps {
  assetIdx: number
  asset: Asset
  metadata: AssetMetadata
}

export const UploadedAsset: FC<UploadedAssetProps> = ({ assetIdx, asset, metadata }) => {
  const { t } = useTranslation('UploadedAsset')
  const { error, success } = useNotification()
  const [assetStatus, setAssetStatus] = useState<AssetStatus>(asset.status)
  const session = useSession()
  console.log('session', session)
  useEffect(() => {
    let interval: NodeJS.Timer

    if (equals(assetStatus)(AssetStatus.processing)) {
      interval = setInterval(async () => {
        try {
          const newAsset = await getAsset(asset.id)
          if (newAsset) {
            setAssetStatus(newAsset.status)
            if (!equals(newAsset.status)(AssetStatus.processing)) {
              clearInterval(interval)
            }
          }
        } catch (error) {
          console.error('Error fetching asset status:', error)
        }
      }, 10000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [asset.id, assetStatus])

  const cancel = async (id: string) => {
    try {
      await deleteAsset(id)
      success(t('[Notification] asset deleted'))
    } catch (e) {
      error(t('[Notification] error deleting asset'))
    }
  }

  return (
    <tr key={asset.id}>
      <td className={`${equals(assetIdx)(0) ? '' : 'border-t border-transparent'} relative py-4 pr-3 text-sm`}>
        <div className="font-medium text-gray-900">{truncateCID(asset.cid)}</div>
        {assetIdx !== 0 ? <div className="absolute -top-px left-6 right-0 h-px bg-gray-200" /> : null}
      </td>
      <td
        className={`${
          equals(assetIdx)(0) ? '' : 'border-t border-gray-200'
        } hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell`}
      >
        {equals(asset.status)(AssetStatus.processing) ? <>&hellip;</> : propOr('', 'name')(metadata)}
      </td>
      <td
        className={`${
          equals(assetIdx)(0) ? '' : 'border-t border-gray-200'
        } hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell`}
      >
        {equals(asset.status)(AssetStatus.processing) ? <>&hellip;</> : propOr('', 'date')(metadata)}
      </td>
      <td
        className={`${
          equals(assetIdx)(0) ? '' : 'border-t border-gray-200'
        } hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell`}
      >
        {match(assetStatus)
          .with(AssetStatus.processing, () => (
            <div className="inline-flex gap-x-2 text-sm text-gray-500">
              <LoadingIndicator />
              <p className="text-xs">{t('[Status] processing')}</p>
            </div>
          ))
          .with(AssetStatus.minted, () => <span className="text-green-600">{t('[Status] minted')}</span>)
          .with(AssetStatus.rejected, () => <span className="text-red-500">{t('[Status] rejected')}</span>)
          .otherwise(() => '')}
      </td>
      <td
        className={`${
          equals(assetIdx)(0) ? '' : 'border-t border-transparent'
        } relative py-3.5 pl-3 text-right text-sm font-medium space-x-2`}
      >
        {match(assetStatus)
          .with(AssetStatus.rejected, () => (
            <div className="flex items-center justify-end text-red-500">
              {t('[Status] rejected')}
              <button
                type="button"
                className="inline-flex items-center rounded-md px-2.5 py-1.5 pr-1 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-gray-300 ml-1"
                onClick={() => cancel(asset.id)}
              >
                <TrashIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
              </button>
            </div>
          ))
          .with(AssetStatus.pending, () => (
            <div className="flex items-center justify-end text-gray-500">
              <Mint assetId={asset.id} />
              <button
                type="button"
                className="inline-flex items-center rounded-md px-2.5 py-1.5 pr-1 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-gray-300 ml-1"
                onClick={() => cancel(asset.id)}
              >
                <TrashIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
              </button>
            </div>
          ))
          .otherwise(() => '')}
        {!equals(assetIdx)(0) ? <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" /> : null}
      </td>
    </tr>
  )
}
