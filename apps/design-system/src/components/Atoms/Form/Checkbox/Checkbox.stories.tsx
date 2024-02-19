import { Meta, Story } from '@storybook/react'

import { Checkbox } from './Checkbox'

export default {
  component: Checkbox,
  title: 'Components/Form/Checkbox',
} as Meta

const CheckboxTemplate: Story = ({ label, name, value, checked, description, inputRef, onChange }) => (
  <Checkbox
    label={label}
    name={name}
    value={value}
    checked={checked}
    description={description}
    inputRef={inputRef}
    onChange={onChange}
  />
)

export const CheckboxComponent = CheckboxTemplate.bind({})

CheckboxComponent.args = {
  label: 'label',
  name: 'name',
  value: 'value',
  description: 'DESCRIPTION',
  error: 'ERROR',
  checked: false,
  inputRef: null,
  onChange: () => {},
}
