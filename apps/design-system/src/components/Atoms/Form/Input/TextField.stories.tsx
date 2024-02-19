import { Meta, Story } from '@storybook/react'

import { TextField } from './TextField'

export default {
  component: TextField,
  title: 'Components/Form/TextField',
} as Meta

const TextTemplate: Story = ({ label, name, value, error, disabled, inputRef, onChange }) => (
  <TextField
    label={label}
    name={name}
    value={value}
    error={error}
    disabled={disabled}
    inputRef={inputRef}
    onChange={onChange}
  />
)

export const TextComponent = TextTemplate.bind({})

TextComponent.args = {
  label: 'label',
  name: 'name',
  value: 'value',
  error: 'ERROR',
  disabled: false,
  inputRef: null,
  onChange: () => {},
}
