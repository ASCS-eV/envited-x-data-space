import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'

import ThemeToggle from './ThemeToggle'

describe('modules/ThemeToggle', () => {
  describe('render', () => {
    it('should render as expected', async () => {
      // when ... rendering component
      // then ... should render with expected element type

      const { getByRole } = render(<ThemeToggle />)
      expect(getByRole('button')).toBeInTheDocument()
    })
  })
})
