import { render, screen } from '@testing-library/react'

import { Checkboxes } from './Checkboxes'

describe('atoms/Checkboxes', () => {
  describe('render', () => {
    it('should render Checkboxes', () => {
      // when ... we rendering component
      render(
        <Checkboxes
          label="CHECKBOXES"
          items={[
            {
              id: 'item-1',
              name: 'Item 1',
              description: 'Item description',
            },
            {
              id: 'item-2',
              name: 'Item 2',
              description: 'Item description',
            },
            {
              id: 'item-3',
              name: 'Item 3',
              description: 'Item description',
            },
          ]}
          values={[]}
          handleCheckbox={() => {}}
          onChange={() => {}}
          inputRef={() => {}}
          name="NAME"
        />,
      )

      // then ... it should return as expected
      const element = screen.getByText('CHECKBOXES')
      expect(element).toBeInTheDocument()
    })
  })
})
