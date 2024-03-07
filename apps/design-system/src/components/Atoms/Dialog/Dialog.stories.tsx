import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Dialog } from './Dialog'

export default {
  component: Dialog,
  title: 'Components/Dialog',
} as Meta

const Template: Story = ({ isOpen, setShow, heading, description }) => (
  <Dialog
    isOpen={isOpen}
    setShow={setShow}
    heading={heading}
    description={description}
    action={<button>CLICK</button>}
  />
)

export const DialogStory = Template.bind({})

DialogStory.args = {
  isOpen: true,
  setShow: () => {},
  heading: 'Heading',
  description: 'Description',
}
