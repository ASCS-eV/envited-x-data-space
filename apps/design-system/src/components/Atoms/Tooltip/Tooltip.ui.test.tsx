import { render, screen } from '@testing-library/react'
import React from 'react'

import { Size } from '../../../types'
import Tooltip from './Tooltip'

describe('atoms/Tooltip', () => {
  describe('render', () => {
    it('should render Tooltip with content', () => {
      const content = 'Tooltip content'
      // when ... rendering component
      render(<Tooltip size={Size.small}>{content}</Tooltip>)
      const TooltipElement = screen.getByText(content)

      // then ... should render as expected
      expect(TooltipElement).toBeInTheDocument()
    })
  })
})
