import { Meta, Story } from '@storybook/react'
import React from 'react'

import { UploadAssetStatus } from '../../../types'
import ProgressBar from './ProgressBar'

export default {
  component: ProgressBar,
  title: 'Components/ProgressBar',
} as Meta

const Template: Story = ({ percent, status }) => <ProgressBar percent={percent} status={status} />

export const ProgressBarStory = Template.bind({})

ProgressBarStory.args = {
  percent: 0,
  status: UploadAssetStatus.uploaded,
}
