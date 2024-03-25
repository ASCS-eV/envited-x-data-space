import { render, screen } from '@testing-library/react'

import { DragAndDropAssetsField } from './DragAndDropAssetsField'

describe('Molecules/DragAndDropAssetsField', () => {
  describe('render', () => {
    it('should render DragAndDropAssetsField', () => {
      // when ... we rendering component
      render(
        <DragAndDropAssetsField
          label="LABEL"
          files="VALUE"
          inputRef={() => {}}
          name="NAME"
          onDrop={() => {}}
          onChange={() => {}}
          removeFile={() => {}}
        />,
      )

      // then ... it should return as expected
      const element = screen.getByText('LABEL')
      expect(element).toBeInTheDocument()
    })
  })
})
