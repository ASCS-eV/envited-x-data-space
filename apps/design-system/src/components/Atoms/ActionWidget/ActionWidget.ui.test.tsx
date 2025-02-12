import { render, screen } from '@testing-library/react'
import React from 'react'

import ActionWidget from './ActionWidget'

describe('atoms/ActionWidget', () => {
  describe('render', () => {
    it('should render ActionWidget', () => {
      // when ... rendering component
      render(<ActionWidget title="WIDGET TITLE" href="" description="WIDGET DESCRIPTION" />)
      const element = screen.getByText(/WIDGET DESCRIPTION/i)

      // then ... should render as expected
      expect(element).toBeInTheDocument()
    })
  })
})
