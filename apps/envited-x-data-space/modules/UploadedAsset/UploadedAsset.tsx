'use client'

import { LoadingIndicator } from '@envited-x-data-space/design-system'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { equals } from 'ramda'
import { FC, useEffect, useState } from 'react'
import { match } from 'ts-pattern'

import { useTranslation } from '../../common/i18n'
import { Asset, AssetStatus } from '../../common/types'
import { formatDate, truncateCID } from '../../common/utils'
import { getAsset } from './UploadedAsset.actions'
import { UploadedAssetButtons } from './UploadedAsset.buttons'

interface UploadedAssetProps {
  assetIdx: number
  asset: Asset
}

export const UploadedAsset: FC<UploadedAssetProps> = ({ assetIdx, asset }) => {
  const { t } = useTranslation('UploadedAsset')
  const [assetStatus, setAssetStatus] = useState<AssetStatus>(asset.status)

  useEffect(() => {
    let interval: NodeJS.Timer

    if (equals(assetStatus)(AssetStatus.processing)) {
      interval = setInterval(async () => {
        try {
          const newAsset = await getAsset(asset.id) as Asset
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

  return (
    <tr key={asset.id}>
      <td className={`${equals(assetIdx)(0) ? '' : 'border-t border-transparent'} relative py-4 pr-3 text-sm`}>
        <div className="font-medium text-gray-900">
          {asset.name}
          <br />
          <span className="text-xs text-gray-500 italic pt-1">{truncateCID(asset.cid)}</span>
        </div>
        {assetIdx !== 0 ? <div className="absolute -top-px left-6 right-0 h-px bg-gray-200" /> : null}
      </td>
      <td
        className={`${
          equals(assetIdx)(0) ? '' : 'border-t border-gray-200'
        } hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell`}
      >
        {equals(asset.status)(AssetStatus.processing) ? <>&hellip;</> : formatDate(asset.createdAt)}
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
          .with(AssetStatus.pending, () => (
            <div className="flex items-center justify-end gap-x-2 sm:justify-start text-sm">
              <div className="hidden text-gray-500 sm:block text-xs">{t('[Status] pending')}</div>
            </div>
          ))
          .with(AssetStatus.minted, () => (
            <div className="flex items-center justify-end gap-x-2 sm:justify-start text-sm">
              <CheckIcon className="h-4 w-4 text-green-600" aria-hidden="true" />
              <div className="hidden text-green-600 sm:block text-xs">{t('[Status] minted')}</div>
            </div>
          ))
          .with(AssetStatus.rejected, () => (
            <div className="flex items-center justify-end gap-x-2 sm:justify-start text-sm">
              <XMarkIcon className="h-4 w-4 text-red-500" aria-hidden="true" />
              <div className="hidden text-red-500 sm:block text-xs">{t('[Status] rejected')}</div>
            </div>
          ))
          .otherwise(() => '')}
      </td>
      <td
        className={`${
          equals(assetIdx)(0) ? '' : 'border-t border-transparent'
        } relative py-3.5 pl-3 text-right text-sm font-medium space-x-2`}
      >
        <UploadedAssetButtons id={asset.id} status={assetStatus} />
        {!equals(assetIdx)(0) ? <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" /> : null}
      </td>
    </tr>
  )
}
