import { Meta, Story } from '@storybook/react'
import React from 'react'

import Date from './Date'

export default {
  component: Date,
  title: 'Components/Date',
} as Meta

const DateTemplate: Story = ({ date }) => <Date date={date} />

export const Main = DateTemplate.bind({})

Main.args = {
  date: '2021-09-27T10:26:14Z',
}
