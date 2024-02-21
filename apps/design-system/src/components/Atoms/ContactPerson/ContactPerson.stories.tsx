import { Meta, Story } from '@storybook/react'

import ContactPerson from './ContactPerson'

export default {
  component: ContactPerson,
  title: 'Components/ContactPerson',
} as Meta

const Template: Story = ({ name, phone, email }) => <ContactPerson name={name} phone={phone} email={email} />

export const ContactPersonStory = Template.bind({})

ContactPersonStory.args = {
  name: 'Name',
  phone: '+1234567',
  email: 'info@envited.market',
}
