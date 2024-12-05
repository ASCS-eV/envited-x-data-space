'use client'

import { FC } from 'react'
import { useTranslation } from '../../common/i18n'
import { Asset } from '../../common/types'
import { isEmpty } from 'ramda'
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
          <thead>
            <tr>
              <th scope="col" className="py-3.5 text-left text-sm font-semibold text-gray-900">
                {t('[Label] asset')}
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                {t('[Label] type')}
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">{t('[Label] select')}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, assetIdx) => {
              const metadata = !isEmpty(asset.metadata)
                ? typeof asset.metadata === 'string'
                  ? JSON.parse(asset.metadata)
                  : asset.metadata
                : {}

              return (
                <UploadedAsset key={asset.id} asset={asset} assetIdx={assetIdx} metadata={metadata} />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
