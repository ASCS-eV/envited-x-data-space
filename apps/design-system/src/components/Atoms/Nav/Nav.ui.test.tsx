import { render, screen } from '@testing-library/react'
import React from 'react'

import Nav from './Nav'
import { NavItem } from './NavItem'

describe('components/Nav', () => {
  it('should render Nav with default properties', () => {
    // when ... rendering component
    render(
      <Nav>
        <NavItem>NAV ITEM 1</NavItem>
        <NavItem>NAV ITEM 2</NavItem>
        <NavItem>NAV ITEM 3</NavItem>
      </Nav>,
    )

    const element = screen.getByText(/NAV ITEM 1/i)

    // then ... should render as expected
    expect(element).toBeInTheDocument()
  })
})
