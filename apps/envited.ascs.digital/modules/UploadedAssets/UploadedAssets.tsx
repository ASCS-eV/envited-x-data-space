'use client'

import { isEmpty } from 'ramda'
import { FC } from 'react'

import { useTranslation } from '../../common/i18n'
import { Asset } from '../../common/types'
import { UploadedAsset } from '../UploadedAsset'

interface UploadedAssetsProps {
  assets: Asset[]
}

export const UploadedAssets: FC<UploadedAssetsProps> = ({ assets }) => {
  const { t } = useTranslation('UploadedAssets')

  return (
    <div className="mt-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">{t('[Heading] uploaded assets')}</h1>
          <p className="mt-2 text-sm text-gray-700">{t('[Description] uploaded asset')}</p>
        </div>
      </div>
      <div className="-mx-4 mt-6 sm:mx-0 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <tr>
            <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-900">
              {t('[Label] name')}
            </th>
            <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
              {t('[Label] created at')}
            </th>
            <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
              {t('[Label] status')}
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 text-sm font-semibold text-gray-900">
              <span className="sr-only">{t('[Label] select')}</span>
            </th>
          </tr>
          <tbody>
            {assets.map((asset, assetIdx) => (
              <UploadedAsset key={asset.id} asset={asset} assetIdx={assetIdx} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
