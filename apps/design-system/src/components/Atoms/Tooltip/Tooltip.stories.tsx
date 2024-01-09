import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Size, TooltipType } from '../../../types'
import Tooltip from './Tooltip'

export default {
  component: Tooltip,
  title: 'Components/Tooltip',
} as Meta

const Template: Story = ({ size, type, description }) => (
  <Tooltip size={size} type={type}>
    {description}
  </Tooltip>
)

export const TooltipStory = Template.bind({})

TooltipStory.args = {
  size: Size.medium,
  type: TooltipType.info,
  description: 'Tooltip content',
}
