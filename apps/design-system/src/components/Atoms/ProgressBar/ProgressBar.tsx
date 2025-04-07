import React, { FC } from 'react'

import { UploadStatus } from '../../../types'

interface Props {
  percent: number
  status: UploadStatus
}

const ProgressBar: FC<Props> = ({ percent, status }) => {
  const statusClassMap = {
    [UploadStatus.idle]: 'bg-gray-200',
    [UploadStatus.queued]: 'bg-gray-200',
    [UploadStatus.uploading]: 'bg-blue',
    [UploadStatus.uploaded]: 'bg-green-400',
    [UploadStatus.error]: 'bg-red-600',
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
