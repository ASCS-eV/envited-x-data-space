import React, { FC } from 'react'

import { UploadAssetStatus } from '../../../types'

interface Props {
  percent: number
  status: UploadAssetStatus
}

const ProgressBar: FC<Props> = ({ percent, status }) => {
  const statusClassMap = {
    [UploadAssetStatus.idle]: 'bg-gray-200',
    [UploadAssetStatus.queued]: 'bg-gray-200',
    [UploadAssetStatus.uploading]: 'bg-blue',
    [UploadAssetStatus.uploaded]: 'bg-green-400',
    [UploadAssetStatus.error]: 'bg-red-600',
  }

  return (
    <div className="w-full bg-gray-200 rounded-full">
      <div
        className={`${statusClassMap[status]} text-xs font-medium text-center p-1 leading-none rounded-full transition-all duration-200`}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}

export default ProgressBar
