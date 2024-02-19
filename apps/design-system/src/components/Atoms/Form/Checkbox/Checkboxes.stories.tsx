import { Meta, Story } from '@storybook/react'

import { Checkboxes } from './Checkboxes'

export default {
  component: Checkboxes,
  title: 'Components/Form/Checkboxes',
} as Meta

const CheckboxesTemplate: Story = ({ label, name, values, description, inputRef, onChange }) => (
  <Checkboxes
    label={label}
    name={name}
    values={values}
    items={[
      {
        id: 'item-1',
        name: 'Item 1',
        description: 'Item description',
      },
      {
        id: 'item-2',
        name: 'Item 2',
        description: 'Item description',
      },
      {
        id: 'item-3',
        name: 'Item 3',
        description: 'Item description',
      },
    ]}
    handleCheckbox={x => values.push(x)}
    description={description}
    inputRef={inputRef}
    onChange={onChange}
  />
)

export const CheckboxesComponent = CheckboxesTemplate.bind({})

CheckboxesComponent.args = {
  label: 'label',
  name: 'name',
  values: ['item-1'],
  description: 'DESCRIPTION',
  error: 'ERROR',
  checked: false,
  inputRef: null,
  onChange: () => {},
}
