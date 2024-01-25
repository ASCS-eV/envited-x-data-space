import { render, screen } from '@testing-library/react'
import React from 'react'

import NavItem from './NavItem'

describe('components/NavItem', () => {
  it('should render NavItem with default properties', () => {
    // when ... rendering component
    render(<NavItem>MY NAV ITEM</NavItem>)
    const element = screen.getByText(/MY NAV ITEM/i)

    // then ... should render as expected
    expect(element).toBeInTheDocument()
  })

  it.each([
    [false, 'text-gray-600'],
    [true, 'text-black'],
  ])('should render as expected', (isActive, expected) => {
    // when ... rendering component
    render(<NavItem active={isActive}>MY NAV ITEM</NavItem>)

    const ItemElement = screen.getByText(/MY NAV ITEM/i)

    // then ... should render with expected css class
    expect(ItemElement).toHaveClass(expected)
  })
})
