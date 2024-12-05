import { LoadingIndicator } from '@envited-x-data-space/design-system'
import { equals, last, propOr } from 'ramda'
import { FC } from 'react'
import { match } from 'ts-pattern'
import { Asset, AssetMetadata, AssetStatus } from '../../common/types'
import { Mint } from '../Mint'

interface UploadedAssetProps {
  assetIdx: number
  asset: Asset
  metadata: AssetMetadata
}

export const UploadedAsset: FC<UploadedAssetProps> = ({ assetIdx, asset, metadata }) => {
  return (
    <tr key={asset.id}>
      <td
        className={`${equals(assetIdx)(0) ? '' : 'border-t border-transparent'} relative py-4 pr-3 text-sm`}
      >
        <div className="font-medium text-gray-900">
          {equals(asset.status)(AssetStatus.processing) ? asset.cid : propOr('', 'name')(metadata)}
        </div>
        <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
          <span>{propOr('', 'type')(metadata)}</span>
          <span className="hidden sm:inline">·</span>
          <span>{propOr('', 'size')(metadata)}</span>
        </div>
        {assetIdx !== 0 ? <div className="absolute -top-px left-6 right-0 h-px bg-gray-200" /> : null}
      </td>
      <td
        className={`${
          equals(assetIdx)(0) ? '' : 'border-t border-gray-200'
        } hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell`}
      >
        {equals(asset.status)(AssetStatus.processing) ? <>&hellip;</> : last(propOr('', 'tags')(metadata))}
      </td>
      <td
        className={`${
          equals(assetIdx)(0) ? '' : 'border-t border-transparent'
        } relative py-3.5 pl-3 text-right text-sm font-medium space-x-2`}
      >
        {match(asset.status)
          .with(AssetStatus.processing, () => (
            <div className="inline-flex gap-x-2 text-sm text-gray-500">
              <LoadingIndicator />
              <p className="text-xs">{t('[Status] processing')}</p>
            </div>
          ))
          .with(AssetStatus.minted, () => <span className="text-green-600">{t('[Status] minted')}</span>)
          .otherwise(() => (
            <Mint assetId={asset.id} />
          ))}
        {!equals(assetIdx)(0) ? <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" /> : null}
      </td>
    </tr>
  )
}
