import { Meta, Story } from '@storybook/react'

import Pill from '../../Atoms/Pill/Pill'
import MemberProfileCard from './MemberProfileCard'

export default {
  component: MemberProfileCard,
  title: 'Molecules/MemberProfileCard',
} as Meta

const Template: Story = ({ title, logoUri, street, city, postalCode, country }) => (
  <MemberProfileCard
    title={title}
    logoUri={logoUri}
    street={street}
    city={city}
    postalCode={postalCode}
    country={country}
    businessCategories={
      <>
        <Pill>OEM</Pill>
        <Pill>Supplier</Pill>
      </>
    }
  />
)

export const MemberProfileCardStory = Template.bind({})

MemberProfileCardStory.args = {
  title: 'The golden idea ',
  logoUri: 'https://source.unsplash.com/random',
  street: 'Main street 1',
  city: 'Munich',
  postalCode: '1234',
  country: 'Germany',
}
