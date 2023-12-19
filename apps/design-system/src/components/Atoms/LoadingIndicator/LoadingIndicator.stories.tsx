import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Colour, Size } from '../../../types'
import LoadingIndicator from './LoadingIndicator'

export default {
  component: LoadingIndicator,
  title: 'Components/LoadingIndicator',
} as Meta

const LoadingIndicatorTemplate: Story = ({ size, colour }) => <LoadingIndicator size={size} colour={colour} />

export const Main = LoadingIndicatorTemplate.bind({})

Main.args = {
  size: Size.medium,
  colour: Colour.main,
}
