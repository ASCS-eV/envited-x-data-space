import { render, screen } from '@testing-library/react'
import React from 'react'

import IconButtonWithTooltip from './IconButtonWithTooltip'

describe('atoms/IconButtonWithTooltip', () => {
  describe('render', () => {
    it('should render IconButtonWithTooltip with content', () => {
      const content = 'Tooltip content'
      // when ... rendering component
      render(
        <IconButtonWithTooltip icon={<span>Button</span>} onClick={() => {}}>
          {content}
        </IconButtonWithTooltip>,
      )
      const IconButtonWithTooltipElement = screen.getByText(content)

      // then ... should render as expected
      expect(IconButtonWithTooltipElement).toBeInTheDocument()
    })
  })
})
