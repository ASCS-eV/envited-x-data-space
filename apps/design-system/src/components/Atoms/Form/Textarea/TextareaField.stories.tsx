import { Meta, Story } from '@storybook/react'

import { TextareaField } from './TextareaField'

export default {
  component: TextareaField,
  title: 'Components/Form/TextareaField',
} as Meta

const TextareaTemplate: Story = ({ label, name, value, description, error, disabled, inputRef, onChange }) => (
  <TextareaField
    label={label}
    name={name}
    value={value}
    description={description}
    error={error}
    disabled={disabled}
    inputRef={inputRef}
    onChange={onChange}
  />
)

export const TextareaComponent = TextareaTemplate.bind({})

TextareaComponent.args = {
  label: 'label',
  name: 'name',
  value: 'value',
  description: 'DESCRIPTION',
  error: 'ERROR',
  disabled: false,
  inputRef: null,
  onChange: () => {},
}
