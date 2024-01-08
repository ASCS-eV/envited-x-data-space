import { render, screen } from '@testing-library/react'
import React from 'react'

import Date from './Date'

describe('atoms/Date', () => {
  describe('render', () => {
    it.each([
      ['1970-01-01T00:00:00Z', 'January 1, 1970'],
      ['2021-09-27T10:26:14Z', 'September 27, 2021'],
    ])('should, with value %s, return %s as expexted', (date, result) => {
      // when ... we rendering component
      render(<Date date={date} />)

      // then ... it should return as expected
      const element = screen.getByText(result)
      expect(element).toBeInTheDocument()
    })
  })
})
