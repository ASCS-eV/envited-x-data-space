import { render, screen } from '@testing-library/react'
import React from 'react'

import { Size } from '../../../types'
import Pill from './Pill'

describe('atoms/Pill', () => {
  describe('render', () => {
    it.each([
      [Size.small, 'CONTENT', 'text-xs'],
      [Size.medium, 'CONTENT', 'text-sm'],
      [Size.large, 'CONTENT', 'text-base'],
    ])('should render Pill with content', (size, child, expected) => {
      // when ... rendering component
      render(<Pill size={size}>{child}</Pill>)
      const PillElement = screen.getByText(child)

      // then ... should render as expected
      expect(PillElement).toBeInTheDocument()
      expect(PillElement).toHaveClass(expected)
    })
  })
})
