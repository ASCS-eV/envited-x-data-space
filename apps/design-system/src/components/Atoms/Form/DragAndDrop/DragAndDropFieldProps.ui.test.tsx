import { render, screen } from '@testing-library/react'

import { DragAndDropField } from './DragAndDropField'

describe('atoms/DragAndDropField', () => {
  describe('render', () => {
    it('should render DragAndDropField', () => {
      // when ... we rendering component
      render(
        <DragAndDropField
          label="LABEL"
          value="VALUE"
          inputRef={() => {}}
          name="NAME"
          onDrop={() => {}}
          onChange={() => {}}
        />,
      )

      // then ... it should return as expected
      const element = screen.getByText('LABEL')
      expect(element).toBeInTheDocument()
    })
  })
})
