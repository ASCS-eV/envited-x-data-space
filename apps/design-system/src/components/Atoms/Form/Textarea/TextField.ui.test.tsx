import { render, screen } from '@testing-library/react'

import { TextareaField } from './TextareaField'

describe('atoms/TextareaField', () => {
  describe('render', () => {
    it('should render TextareaField', () => {
      // when ... we rendering component
      render(<TextareaField label="LABEL" value="VALUE" disabled={true} inputRef={() => {}} name="NAME" />)

      // then ... it should return as expected
      const element = screen.getByText('LABEL')
      expect(element).toBeInTheDocument()
    })
  })
})
