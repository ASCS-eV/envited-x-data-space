import { Meta, Story } from '@storybook/react'

import MemberProfileCard from './MemberProfileCard'

export default {
  component: MemberProfileCard,
  title: 'Molecules/MemberProfileCard',
} as Meta

const Template: Story = ({ title, logoUri }) => <MemberProfileCard title={title} logoUri={logoUri} />

export const MemberProfileCardStory = Template.bind({})

MemberProfileCardStory.args = {
  title: 'The golden idea ',
  logoUri: 'https://source.unsplash.com/random',
}
