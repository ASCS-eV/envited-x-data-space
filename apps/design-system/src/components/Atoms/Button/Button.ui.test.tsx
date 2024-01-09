import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { ButtonStyle, ButtonType, Size } from '../../../types'
import Button from './Button'

describe('components/Button', () => {
  describe('render', () => {
    it('should render Button with default properties', async () => {
      // when ... rendering component
      const onClickStub = jest.fn()
      render(<Button onClick={onClickStub}>Button</Button>)
      const element = screen.getByText(/Button/i)

      // then ... should render with expected properties
      expect(element).toBeInTheDocument()
      expect(element).toHaveClass('bg-orange')
      await userEvent.click(element)
      expect(onClickStub).toHaveBeenCalledWith()
    })

    it('should render Button with specific properties', () => {
      // when ... rendering component
      const onClickStub = jest.fn()
      render(
        <Button onClick={onClickStub} size={Size.small} type={ButtonType.secondary} style={ButtonStyle.ghost}>
          Button
        </Button>,
      )
      const element = screen.getByText(/Button/i)

      // then ... should render with expected properties
      expect(element).toBeInTheDocument()
      expect(element).toHaveClass('sm:text-sm')
      expect(element).toHaveClass('text-gray-400')
      expect(element).not.toHaveAttribute('disabled')
    })

    it('should render Button with the loader', () => {
      // when ... rendering component
      const onClickStub = jest.fn()
      render(
        <Button onClick={onClickStub} size={Size.small} type={ButtonType.secondary} style={ButtonStyle.ghost} isWorking>
          Button
        </Button>,
      )
      const element = screen.getByRole('button')
      const loadingIndicatorElement = screen.getByTitle('Loading Indicator')

      // then ... should render with expected properties
      expect(element).toBeInTheDocument()
      expect(element).toHaveClass('sm:text-sm')
      expect(element).toHaveClass('text-gray-400')
      expect(element).toHaveAttribute('disabled')
      expect(loadingIndicatorElement).toBeInTheDocument()
    })
  })
})
