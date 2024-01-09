import { Meta, Story } from '@storybook/react'
import React from 'react'

import Card from './Card'

export default {
  component: Card,
  title: 'Components/Card',
} as Meta

const CardTemplate: Story = ({ content }) => <Card>{content}</Card>

export const Main = CardTemplate.bind({})

Main.args = {
  content: 'Card content',
}
