import { render } from '@testing-library/react'
import React from 'react'

import Switch from './Switch'

describe('atoms/Switch', () => {
  describe('render', () => {
    it.each([
      [true, 'CONTENT'],
      [false, 'CONTENT'],
    ])('should render Pill with content', (status, expected) => {
      // when ... rendering component
      const { container } = render(<Switch status={status} onClick={() => {}} />)

      // then ... should render as expected
      expect(container).toBeInTheDocument()
    })
  })
})
