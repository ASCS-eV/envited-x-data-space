import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Heading } from '../Heading'
import { Tooltip } from '../Tooltip'
import HeadingWithTooltip from './HeadingWithTooltip'

export default {
  component: HeadingWithTooltip,
  title: 'Atoms/HeadingWithTooltip',
} as Meta

const HeadingWithTooltipTemplate: Story = ({ heading, tooltip }) => (
  <HeadingWithTooltip tooltip={tooltip} heading={heading} />
)

export const Main = HeadingWithTooltipTemplate.bind({})

Main.args = {
  heading: <Heading importance="h4">Title</Heading>,
  tooltip: <Tooltip>Tooltip</Tooltip>,
}
