import { Meta, Story } from '@storybook/react'
import React from 'react'

import ActionWidget from './ActionWidget'

export default {
  component: ActionWidget,
  title: 'Components/ActionWidget',
} as Meta

const ActionWidgetTemplate: Story = ({ title, href, description }) => (
  <ActionWidget title={title} description={description} href={href} />
)

export const ActionWidgetComponent = ActionWidgetTemplate.bind({})

ActionWidgetComponent.args = {
  title: 'title',
  href: 'href',
  description: 'description',
}
