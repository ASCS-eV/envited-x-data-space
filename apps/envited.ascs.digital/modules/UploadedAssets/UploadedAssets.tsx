'use client'

import { LoadingIndicator } from '@envited-marketplace/design-system'
import { equals, isEmpty, propOr } from 'ramda'

import { useTranslation } from '../../common/i18n'
import { Asset, AssetStatus } from '../../common/types'
// import { mintToken, wallet } from '../../common/web3'
// import { uploadTokenMetadata, getMintParams } from './UploadedAssets.actions'
import { Mint } from '../Mint/Mint'

export const UploadedAssets = ({ assets }: { assets: Asset[] }) => {
  const { t } = useTranslation('UploadedAssets')
  
  return (
    <div className="mt-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">{t('[Heading] uploaded assets')}</h1>
          <p className="mt-2 text-sm text-gray-700">{t('[Description] uploaded assets')}</p>
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
              const metadata = !isEmpty(asset.metadata) ? JSON.parse(asset.metadata) : {}

              return (
                <tr key={asset.id}>
                  <td
                    className={`${equals(assetIdx)(0) ? '' : 'border-t border-transparent'} relative py-4 pr-3 text-sm`}
                  >
                    <div className="font-medium text-gray-900">
                      {equals(asset.status)(AssetStatus.processing) ? asset.cid : propOr('', 'name')(metadata)}
                    </div>
                    <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                      <span>{metadata.type}</span>
                      <span className="hidden sm:inline">·</span>
                      <span>{metadata.size}</span>
                    </div>
                    {assetIdx !== 0 ? <div className="absolute -top-px left-6 right-0 h-px bg-gray-200" /> : null}
                  </td>
                  <td
                    className={`${
                      equals(assetIdx)(0) ? '' : 'border-t border-gray-200'
                    } hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell`}
                  >
                    {equals(asset.status)(AssetStatus.processing) ? <>&hellip;</> : propOr('', 'symbol')(metadata)}
                  </td>
                  <td
                    className={`${
                      equals(assetIdx)(0) ? '' : 'border-t border-transparent'
                    } relative py-3.5 pl-3 text-right text-sm font-medium space-x-2`}
                  >
                    {equals(asset.status)(AssetStatus.processing) ? (
                      <div className="inline-flex gap-x-2 text-sm text-gray-500">
                        <LoadingIndicator />
                        <p className="text-xs">Processing...</p>
                      </div>
                    ) : (
                      <>
                        <Mint assetId={asset.id} />
                        <a
                          href={`${asset.id}`}
                          className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                        >
                          {t('[Button] preview')}
                        </a>
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                        >
                          {t('[Button] delete')}
                        </button>
                      </>
                    )}
                    {!equals(assetIdx)(0) ? <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" /> : null}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
