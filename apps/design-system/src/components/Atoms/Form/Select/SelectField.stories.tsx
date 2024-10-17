import { Meta, Story } from '@storybook/react'

import { SelectField } from './SelectField'

export default {
  component: SelectField,
  title: 'Components/Form/SelectField',
} as Meta

const SelectTemplate: Story = ({ label, name, error, inputRef, onChange }) => (
  <SelectField
    label={label}
    name={name}
    selected={{ id: 'ID', name: 'NAME' }}
    options={[
      { id: 'ID', name: 'NAME' },
      { id: 'ID 1', name: 'NAME 1' },
    ]}
    error={error}
    inputRef={inputRef}
    onChange={onChange}
  />
)

export const SelectComponent = SelectTemplate.bind({})

SelectComponent.args = {
  label: 'label',
  name: 'name',
  error: 'ERROR',
  inputRef: null,
  onChange: () => {},
}
