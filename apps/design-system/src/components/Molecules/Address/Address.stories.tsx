import { Meta, Story } from '@storybook/react'

import Address from './Address'

export default {
  component: Address,
  title: 'Molecules/Address',
} as Meta

const Template: Story = ({ street, city, postalCode, country, phone, email }) => (
  <Address street={street} city={city} postalCode={postalCode} country={country} phone={phone} email={email} />
)

export const AddressStory = Template.bind({})

AddressStory.args = {
  street: 'Main street 1',
  city: 'Munich',
  postalCode: '1234',
  country: 'Germany',
  phone: '+1234567',
  email: 'info@envited.market',
}
