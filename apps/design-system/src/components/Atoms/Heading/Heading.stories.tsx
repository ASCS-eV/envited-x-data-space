import { Meta, Story } from '@storybook/react'
import React from 'react'

import Heading from './Heading'

export default {
  component: Heading,
  title: 'Components/Heading',
} as Meta

const HeadingTemplate: Story = ({ importance }) => <Heading importance={importance}>Click me!</Heading>

export const Main = HeadingTemplate.bind({})

Main.args = {
  importance: 'h1',
}
