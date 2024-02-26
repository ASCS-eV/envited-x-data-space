import { Meta, Story } from '@storybook/react'

import { DragAndDropField } from './DragAndDropField'

export default {
  component: DragAndDropField,
  title: 'Components/Form/DragAndDropField',
} as Meta

const FileFieldTemplate: Story = ({ label, name, value, error, inputRef, onChange, onDrop }) => (
  <DragAndDropField
    label={label}
    name={name}
    value={value}
    error={error}
    inputRef={inputRef}
    onDrop={onDrop}
    onChange={onChange}
  />
)

export const FileFieldComponent = FileFieldTemplate.bind({})

FileFieldComponent.args = {
  label: 'label',
  name: 'name',
  value: [],
  error: 'ERROR',
  inputRef: null,
  onChange: () => {},
  onDrop: () => {},
}
