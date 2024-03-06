import { Meta, Story } from '@storybook/react'
import React from 'react'

import { Dialog } from './Dialog'

export default {
  component: Dialog,
  title: 'Components/Dialog',
} as Meta

const Template: Story = ({ isOpen, setShowHide, heading, description }) => (
  <Dialog isOpen={isOpen} setShowHide={setShowHide} heading={heading} description={description} action={<button>CLICK</button>} />
)

export const DialogStory = Template.bind({})

DialogStory.args = {
  isOpen: true,
  setShowHide: () => {},
  heading: 'Heading',
  description: 'Description',
}
