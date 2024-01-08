import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react'
import React from 'react'

import { ColorScheme } from '../../../types'
import ThemeToggle from './ThemeToggle'

export default {
  component: ThemeToggle,
  title: 'Components/ThemeToggle',
  argTypes: { onToggle: { action: 'clicked' } },
} as Meta

const Template: Story = ({ selectedTheme, onToggle }) => (
  <ThemeToggle selectedTheme={selectedTheme} onToggle={onToggle} />
)

export const ThemeToggleStory = Template.bind({})

ThemeToggleStory.args = {
  selectedTheme: ColorScheme.dark,
  onToggle: action('Switch theme'),
}
