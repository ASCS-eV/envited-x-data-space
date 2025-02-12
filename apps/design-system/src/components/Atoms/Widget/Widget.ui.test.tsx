import { render, screen } from '@testing-library/react'
import React from 'react'

import Widget from './Widget'

describe('atoms/Widget', () => {
  describe('render', () => {
    it('should render Widget', () => {
      // when ... rendering component
      render(<Widget title="TITLE" value={0} icon={`ICON` as any} description="WIDGET DESCRIPTION" />)
      const element = screen.getByText(/WIDGET DESCRIPTION/i)

      // then ... should render as expected
      expect(element).toBeInTheDocument()
    })
  })
})
