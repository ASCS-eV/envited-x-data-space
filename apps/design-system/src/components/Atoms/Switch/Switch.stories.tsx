import { Meta, Story } from '@storybook/react'
import React from 'react'

import Switch from './Switch'

export default {
  component: Switch,
  title: 'Components/Switch',
} as Meta

const Template: Story = ({ status, onClick }) => <Switch status={status} onClick={onClick} />

export const SwitchStory = Template.bind({})

SwitchStory.args = {
  status: true,
  onClick: () => {},
}
