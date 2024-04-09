import { Meta, Story } from '@storybook/react'
import React from 'react'

import { AlertType } from '../../../types'
import Alert from './Alert'

export default {
  component: Alert,
  title: 'Components/Alert',
} as Meta

const AlertTemplate: Story = ({ type }) => <Alert type={type}>Alert message</Alert>

export const Main = AlertTemplate.bind({})

Main.args = {
  type: AlertType,
}
