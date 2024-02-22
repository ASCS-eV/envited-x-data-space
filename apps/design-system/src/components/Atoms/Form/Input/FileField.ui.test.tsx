import { render, screen } from '@testing-library/react'

import { FileField } from './FileField'

describe('atoms/FileField', () => {
  describe('render', () => {
    it('should render FileField', () => {
      // when ... we rendering component
      render(<FileField label="LABEL" value="VALUE" inputRef={() => {}} name="NAME" />)

      // then ... it should return as expected
      const element = screen.getByText('LABEL')
      expect(element).toBeInTheDocument()
    })
  })
})
