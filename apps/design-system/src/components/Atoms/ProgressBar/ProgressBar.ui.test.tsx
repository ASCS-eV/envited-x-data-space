import { render, screen } from '@testing-library/react'
import React from 'react'

import { UploadStatus } from '../../../types'
import ProgressBar from './ProgressBar'

describe('atoms/ProgressBar', () => {
  describe('render', () => {
    it.each([
      [0, UploadStatus.queued, 'bg-gray-200'],
      [10, UploadStatus.uploading, 'bg-blue'],
      [100, UploadStatus.uploaded, 'bg-green-400'],
      [0, UploadStatus.error, 'bg-red-600'],
    ])('should render ProgressBar with status', (percent, status, expected) => {
      // when ... rendering component
      const { container } = render(<ProgressBar percent={percent} status={status} />)

      // then ... should render as expected
      expect(container.querySelector(`div.${expected}`)).toBeInTheDocument()
    })
  })
})
