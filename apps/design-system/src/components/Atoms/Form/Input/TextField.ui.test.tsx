import { render, screen } from '@testing-library/react'

import { TextField } from './TextField'

describe('atoms/TextField', () => {
  describe('render', () => {
    it('should render TextField', () => {
      // when ... we rendering component
      render(<TextField label="LABEL" value="VALUE" disabled={true} inputRef={() => {}} name="NAME" />)

      // then ... it should return as expected
      const element = screen.getByText('LABEL')
      expect(element).toBeInTheDocument()
    })
  })
})
