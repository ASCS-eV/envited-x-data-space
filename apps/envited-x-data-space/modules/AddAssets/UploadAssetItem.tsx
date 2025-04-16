'use client'

import { LoadingIndicator, ProgressBar, bytesToMegaBytes } from '@envited-x-data-space/design-system'
import {
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { isEmpty, isNotNil, pathOr, prop, propOr } from 'ramda'
import { FC, useEffect, useState } from 'react'
import { match } from 'ts-pattern'

import { UploadAssetState, UploadStatus } from '../../common/types'
import { anyEqual } from '../../common/utils'
import { validateAsset } from '../../common/validator/utils'

interface UploadAssetItemProps {
  idx: number
  file: File
  state: UploadAssetState
  validHandler: (idx: number, data: any) => void
  removeFile: (idx: number) => void
}

export const UploadAssetCard = ({
  name,
  size,
  progress,
  status,
}: {
  name: string
  size: number
  progress: number
  status: UploadStatus
}) => {
  return (
    <div className="border-gray-300 relative block w-full cursor-pointer rounded-lg border bg-white px-6 py-4 focus:outline-none sm:flex sm:justify-between items-center">
      <span className="flex items-center w-full">
        <span className="flex flex-col text-sm gap-3 w-full">
          <span className="font-medium text-gray-900">{name}</span>
          <span className="flex flex-col gap-2">
            {!anyEqual(status)([UploadStatus.idle, UploadStatus.queued]) && (
              <span className="text-gray-500 flex gap-6 items-center">
                <span className="block sm:inline w-full">
                  <ProgressBar percent={progress} status={status} />
                </span>
              </span>
            )}
            <span className="text-gray-500 flex gap-6 items-center justify-between">
              {match(status)
                .with(UploadStatus.idle, () => <></>)
                .with(UploadStatus.queued, () => (
                  <>
                    <span className="text-xs flex items-center gap-1.5">
                      <ClockIcon className="text-gray-400 w-[18px] h-[18px]" /> Waiting for upload
                    </span>
                  </>
                ))
                .with(UploadStatus.uploading, () => (
                  <>
                    <span className="flex items-center text-xs">
                      <span className="flex gap-x-2 items-center">
                        <LoadingIndicator /> Uploading
                      </span>
                      <span className="hidden sm:mx-1 sm:inline font-bold" aria-hidden="true">
                        &middot;
                      </span>{' '}
                      <span>
                        {bytesToMegaBytes(size * (progress / 100))} MB of {bytesToMegaBytes(size)} MB
                      </span>
                    </span>
                    <span className="block sm:inline text-xs">{progress}%</span>
                  </>
                ))
                .with(UploadStatus.uploaded, () => (
                  <>
                    <span className="text-xs flex items-center gap-1.5">
                      <CheckCircleIcon className="text-green-500 w-[18px] h-[18px]" /> Upload successful!
                    </span>
                    <span className="block sm:inline text-xs">{progress}%</span>
                  </>
                ))
                .with(UploadStatus.error, () => (
                  <>
                    <span className="block sm:inline text-xs">
                      <XMarkIcon className="text-red-600 w-[18px] h-[18px]" /> Upload failed!
                    </span>
                    <span className="block sm:inline text-xs">{progress}%</span>
                  </>
                ))
                .otherwise(() => (
                  <></>
                ))}
            </span>
          </span>
        </span>
      </span>
    </div>
  )
}

export const UploadAssetItem: FC<UploadAssetItemProps> = ({ idx, file, state, validHandler, removeFile }) => {
  const status = propOr(UploadStatus.idle, 'status')(state) as UploadStatus
  const progress = propOr(0, 'progress')(state) as number

  const [asset, setAsset] = useState<any>(null)
  const [validating, setValidating] = useState(true)

  useEffect(() => {
    async function getAssetData() {
      try {
        validHandler(idx, {
          isValid: undefined,
          data: null,
        })
        const data = await validateAsset(file)

        setAsset(data)
        validHandler(idx, data)
        setValidating(false)
      } catch (e) {
        console.log(e)
      }
    }

    if (!asset) {
      getAssetData()
    }
  }, [status])

  console.log('TEST asset', asset)

  return match(status)
    .with(UploadStatus.idle, () => (
      <div className="border-gray-300 hover:border-blue hover:bg-gray-100 relative block w-full cursor-pointer rounded-lg border bg-white px-6 py-4 focus:outline-none sm:flex sm:justify-between items-start">
        <span className="flex items-center grow">
          <span className="flex flex-col text-sm gap-2.5">
            <span className="font-medium text-gray-900">{file.name}</span>
            <span className="text-gray-500 flex items-center gap-2 text-xs">
              {validating ? (
                <span className="block sm:inline">
                  <span className="flex gap-x-1.5 items-center">
                    <LoadingIndicator /> Is validating
                  </span>
                </span>
              ) : (
                <>
                  <span className="block sm:inline text-xs">
                    <span className="flex gap-x-1.5 items-center text-xs">
                      {pathOr(false, ['isValid'])(asset) ? (
                        <>
                          <CheckCircleIcon className="text-green-500 w-[18px] h-[18px]" /> Validated
                        </>
                      ) : (
                        <>
                          <XMarkIcon className="text-red-600 w-[18px] h-[18px]" /> Invalid
                        </>
                      )}
                    </span>
                  </span>
                  {asset.data?.referencedAssets['false']?.length > 0 && (
                    <>
                      <span className="hidden sm:mx-1 sm:inline font-bold" aria-hidden="true">
                        &middot;
                      </span>{' '}
                      <span className="flex gap-x-1.5 items-center text-xs">
                        <ExclamationTriangleIcon className="text-orange-400 w-[18px] h-[18px]" />{' '}
                        {asset.data?.referencedAssets['false']?.length} referenced asset(s) missing
                      </span>
                    </>
                  )}
                </>
              )}
            </span>
            {/*pathOr(false, ['data', 'referencedAssets'])(asset) && !isEmpty(asset.data?.referencedAssets) ? (
              <span className="text-gray-500 flex flex-col text-xs gap-2">
                {asset.data?.referencedAssets['true']?.length > 0 && (
                  <>
                    <span className="flex gap-x-1.5 items-center">
                      <CheckIcon className="text-green-500 w-[18px] h-[18px]" /> Found referenced asset(s):
                    </span>
                    <ul className="list-disc pl-5">
                      {asset.data?.referencedAssets['true'].map(({ id }: { id: string }) => <li key={id}>{id}</li>)}
                    </ul>
                  </>
                )}
                {asset.data?.referencedAssets['false']?.length > 0 && (
                  <>
                    <span className="flex gap-x-1.5 items-center">
                      <ExclamationTriangleIcon className="text-orange-600 w-[18px] h-[18px]" /> Missing referenced asset(s):
                    </span>
                    <ul className="list-disc pl-5">
                      {asset.data?.referencedAssets['false'].map(({ id }: { id: string }) => <li key={id}>{id}</li>)}
                    </ul>
                  </>
                )}
              </span>
            ) : (
              <></>
            )*/}
          </span>
        </span>
        <span className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right">
          <span className="font-medium text-gray-900">{bytesToMegaBytes(file.size)}</span>
          <span className="ml-1 text-gray-500 sm:ml-0">MB</span>
        </span>
        <span className="text-red-500 cursor-pointer ml-6" onClick={() => removeFile(idx)}>
          <XCircleIcon className="text-red-500 w-5 h-5" />
        </span>
      </div>
    ))
    .otherwise(() => <UploadAssetCard name={file.name} size={file.size} status={status} progress={progress} />)
}
