'use client'

import { LoadingIndicator, bytesToMegaBytes } from '@envited-marketplace/design-system'
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { pathOr } from 'ramda'
import { FC, useEffect, useState } from 'react'

import { validateAssetFile } from '../../common/assetValidator'

interface UploadAssetItemProps {
  idx: number
  file: File
  removeFile: (idx: number) => void
}
export const UploadAssetItem: FC<UploadAssetItemProps> = ({ idx, file, removeFile }) => {
  const [asset, setAsset] = useState<any>(null)
  const [validating, setValidating] = useState(true)

  useEffect(() => {
    async function getAssetData() {
      try {
        const data = await validateAssetFile(file)

        setAsset(data)
        setValidating(false)
      } catch (e) {
        console.log(e)
      }
    }

    if (!asset) {
      getAssetData()
    }
  }, [])

  return (
    <div className="border-gray-300 hover:border-blue hover:bg-gray-100 relative block w-full cursor-pointer rounded-lg border bg-white px-6 py-4 focus:outline-none sm:flex sm:justify-between items-center">
      <span className="flex items-center grow">
        <span className="flex flex-col text-sm">
          <span className="font-medium text-gray-900">
            {pathOr('', ['data', 'title'])(asset)}
            {` - `}
            {file.name}
          </span>
          <span className="text-gray-500 flex">
            <span className="block sm:inline">
              <span className="flex gap-x-2 items-center">
                {validating ? (
                  <>
                    <LoadingIndicator /> Is validating
                  </>
                ) : pathOr(false, ['isValid'])(asset) ? (
                  <>
                    <CheckCircleIcon className="text-green-600 w-3.5 h-3.5" /> Validated
                  </>
                ) : (
                  <>
                    <XMarkIcon className="text-red-600 w-3.5 h-3.5" /> Invalid
                  </>
                )}
              </span>
            </span>
            <span className="hidden sm:mx-1 sm:inline" aria-hidden="true">
              &middot;
            </span>{' '}
            <span className="block sm:inline">{pathOr('', ['data', 'type'])(asset)}</span>{' '}
          </span>
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
  )
}
