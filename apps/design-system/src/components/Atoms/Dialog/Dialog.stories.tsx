import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Dialog } from './Dialog'

export default {
  component: Dialog,
  title: 'Components/Dialog',
} as Meta

const Template: Story = ({ open, setOpen, heading, description }) => (
  <Dialog open={open} setOpen={setOpen} heading={heading} description={description} action={<button>CLICK</button>} />
)

export const DialogStory = Template.bind({})

DialogStory.args = {
  open: true,
  setOpen: () => {},
  heading: 'Heading',
  description: 'Description',
}
