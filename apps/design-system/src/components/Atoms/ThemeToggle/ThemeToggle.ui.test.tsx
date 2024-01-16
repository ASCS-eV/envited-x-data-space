import { render } from '@testing-library/react'

import { noop } from '../../../common/utils'
import { ColorScheme } from '../../../types'
import ThemeToggle from './ThemeToggle'

describe('compoments/ThemeToggle', () => {
  describe('render', () => {
    it.each([
      [ColorScheme.light],
      [ColorScheme.dark],
    ])('should render ThemeToggle in state', (theme) => {
      // when ... rendering component
      const { container, getByRole } = render(<ThemeToggle selectedTheme={theme} onToggle={noop} />)

      const themeToggleElement = getByRole('button')
      const svg = container.querySelector('svg')
      
      // then ... should render as expected
      expect(themeToggleElement).toBeInTheDocument()
      expect(svg).toBeInTheDocument()
    })
  })
})
