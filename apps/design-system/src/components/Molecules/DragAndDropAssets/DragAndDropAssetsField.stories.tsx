import { Meta, Story } from '@storybook/react'

import { DragAndDropAssetsField } from './DragAndDropAssetsField'

export default {
  component: DragAndDropAssetsField,
  title: 'Components/Form/DragAndDropAssetsField',
} as Meta

const FileFieldTemplate: Story = ({ label, name, value, error, inputRef, onChange, onDrop }) => (
  <DragAndDropAssetsField
    label={label}
    name={name}
    files={value}
    error={error}
    inputRef={inputRef}
    onDrop={onDrop}
    onChange={onChange}
    removeFile={() => {}}
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
