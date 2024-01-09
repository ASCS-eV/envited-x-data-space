import { render, screen } from '@testing-library/react'
import React from 'react'

import { Heading } from '../Heading'
import { Tooltip } from '../Tooltip'
import HeadingWithTooltip from './HeadingWithTooltip'

describe('atom/HeadingWithTooltip', () => {
  describe('render', () => {
    it('should render HeadingWithTooltip', () => {
      // when ... rendering component
      render(<HeadingWithTooltip tooltip={<Tooltip>TOOLTIP</Tooltip>} heading={<Heading>Title</Heading>} />)
      const element = screen.getByText(/TITLE/i)

      // then ... should render as expected
      expect(element).toBeInTheDocument()
    })
  })
})
