import { render, screen } from '@testing-library/react'
import React from 'react'

import { noop } from '../../../common/utils'
import { ColorScheme } from '../../../types'
import ThemeToggle from './ThemeToggle'

describe('compoments/ThemeToggle', () => {
  describe('render', () => {
    it.each([
      [ColorScheme.light, 'moon.svg'],
      [ColorScheme.dark, 'sun.svg'],
    ])('should render ThemeToggle in state', (theme, icon) => {
      // when ... rendering component
      render(<ThemeToggle selectedTheme={theme} onToggle={noop} />)

      const themeToggleElement = screen.getByText(icon)

      // then ... should render as expected
      expect(themeToggleElement).toBeInTheDocument()
    })
  })
})
