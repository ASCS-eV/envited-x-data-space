import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ButtonStyle, ButtonType, Size } from '../../../types'
import Button from './Button'

export default {
  component: Button,
  title: 'Components/Button',
  argTypes: { onClick: { action: 'clicked' } },
} as Meta

const ButtonTemplate: Story = ({ onClick, type, style, size, isDisabled, isWorking }) => (
  <Button onClick={onClick} type={type} style={style} size={size} isDisabled={isDisabled} isWorking={isWorking}>
    Click me!
  </Button>
)

export const Main = ButtonTemplate.bind({})

Main.args = {
  onClick: action('clicked!'),
  type: ButtonType.primary,
  style: ButtonStyle.solid,
  size: Size.medium,
  isDisabled: false,
  isWorking: false,
  extraClasses: '',
}
