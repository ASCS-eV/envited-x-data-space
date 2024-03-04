import { render, screen } from '@testing-library/react'

import { Dialog } from './Dialog'

describe('atoms/Dialog', () => {
  describe('render', () => {
    it('should render Dialog with content', () => {
      // when ... rendering component
      const setOpenStub = jest.fn()
      render(
        <Dialog
          heading="HEADING"
          description="DESCRIPTION"
          open={true}
          setOpen={setOpenStub}
          action={<button>BUTTON</button>}
        />,
      )
      const DialogElement = screen.getByText('HEADING')

      // then ... should render as expected
      expect(DialogElement).toBeInTheDocument()
    })
  })
})
