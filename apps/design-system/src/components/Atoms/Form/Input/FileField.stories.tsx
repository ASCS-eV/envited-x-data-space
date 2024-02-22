import { Meta, Story } from '@storybook/react'

import { FileField } from './FileField'

export default {
  component: FileField,
  title: 'Components/Form/FileField',
} as Meta

const FileFieldTemplate: Story = ({ label, name, value, error, inputRef, onChange }) => (
  <FileField
    label={label}
    name={name}
    value={value}
    error={error}
    inputRef={inputRef}
    onChange={onChange}
  />
)

export const FileFieldComponent = FileFieldTemplate.bind({})

FileFieldComponent.args = {
  label: 'label',
  name: 'name',
  value: 'value',
  error: 'ERROR',
  inputRef: null,
  onChange: () => {},
}
