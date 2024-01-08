import { render, screen } from '@testing-library/react'
import React from 'react'

import Card from './Card'

describe('atoms/Card', () => {
  describe('render', () => {
    it('should render Card', () => {
      // when ... rendering component
      render(<Card>CARD CONTENT</Card>)
      const element = screen.getByText(/CARD CONTENT/i)

      // then ... should render as expected
      expect(element).toBeInTheDocument()
    })
  })
})
