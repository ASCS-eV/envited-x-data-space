import { Meta, Story } from '@storybook/react'
import React from 'react'

import IconButtonWithTooltip from './IconButtonWithTooltip'

export default {
  component: IconButtonWithTooltip,
  title: 'Components/IconButtonWithTooltip',
} as Meta

const Template: Story = ({ icon, onClick, description }) => (
  <IconButtonWithTooltip icon={icon} onClick={() => onClick()}>
    {description}
  </IconButtonWithTooltip>
)

export const IconButtonWithTooltipStory = Template.bind({})

IconButtonWithTooltipStory.args = {
  icon: <span>ICON</span>,
  onClick: () => console.log('action'),
  description: 'Tooltip content',
}
