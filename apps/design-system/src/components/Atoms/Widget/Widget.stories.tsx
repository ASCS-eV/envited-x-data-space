import { Meta, Story } from '@storybook/react'
import React from 'react'

import Widget from './Widget'

export default {
  component: Widget,
  title: 'Components/Widet',
} as Meta

const WidgetTemplate: Story = ({ title, value, icon, description }) => (
  <Widget title={title} value={value} icon={icon} description={description} />
)

export const WidgetComponent = WidgetTemplate.bind({})

WidgetComponent.args = {
  title: 'title',
  value: 'value',
  icon: 'icon',
  description: 'description',
}
