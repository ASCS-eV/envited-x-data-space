import { Meta, Story } from '@storybook/react'
import React from 'react'

import Nav from './Nav'
import { NavItem } from './NavItem'

export default {
  component: Nav,
  title: 'Components/Nav',
} as Meta

const Template: Story = ({ isActive }) => (
  <Nav>
    <NavItem active={isActive}>Item 1</NavItem>
    <NavItem>Item 2</NavItem>
  </Nav>
)

export const NavComponent = Template.bind({})

NavComponent.args = {
  isActive: true,
}
