import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Size } from '../../../types'
import Pill from './Pill'

export default {
  component: Pill,
  title: 'Components/Pill',
} as Meta

const Template: Story = ({ size }) => <Pill size={size}>CONTENT</Pill>

export const PillLabelStory = Template.bind({})

PillLabelStory.args = {
  size: Size.medium,
}
