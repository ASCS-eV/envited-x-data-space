import { render, screen } from '@testing-library/react'

import { Checkbox } from './Checkbox'

describe('atoms/Checkbox', () => {
  describe('render', () => {
    it('should render Checkbox', () => {
      // when ... we rendering component
      render(<Checkbox label="CHECKBOX" checked={true} inputRef={() => {}} name="NAME" />)

      // then ... it should return as expected
      const element = screen.getByText('CHECKBOX')
      expect(element).toBeInTheDocument()
    })
  })
})
