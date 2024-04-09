import { render, screen } from '@testing-library/react'
import React from 'react'

import { AlertType } from '../../../types'
import Alert from './Alert'

describe('components/Alert', () => {
  describe('render', () => {
    it('should render Alert with succes state', async () => {
      // when ... rendering component
      render(<Alert type={AlertType.succes}>MESSAGE</Alert>)
      const element = screen.getByText(/MESSAGE/i)

      // then ... should render with expected properties
      expect(element).toBeInTheDocument()
      expect(element.parentElement?.parentElement).toHaveClass('bg-green-50')
      expect(element.parentElement?.children[0].children[0]).toHaveClass('text-green-400')
    })

    it('should render Alert with error state', async () => {
      // when ... rendering component
      render(<Alert type={AlertType.error}>MESSAGE</Alert>)
      const element = screen.getByText(/MESSAGE/i)

      // then ... should render with expected properties
      expect(element).toBeInTheDocument()
      expect(element.parentElement?.parentElement).toHaveClass('bg-red-50')
      expect(element.parentElement?.children[0].children[0]).toHaveClass('text-red-400')
    })

    it('should render Alert with info state', async () => {
      // when ... rendering component
      render(<Alert type={AlertType.info}>MESSAGE</Alert>)
      const element = screen.getByText(/MESSAGE/i)

      // then ... should render with expected properties
      expect(element).toBeInTheDocument()
      expect(element.parentElement?.parentElement).toHaveClass('bg-blue-50')
      expect(element.parentElement?.children[0].children[0]).toHaveClass('text-blue-400')
    })

    it('should render Alert with warning state', async () => {
      // when ... rendering component
      render(<Alert type={AlertType.warning}>MESSAGE</Alert>)
      const element = screen.getByText(/MESSAGE/i)

      // then ... should render with expected properties
      expect(element).toBeInTheDocument()
      expect(element.parentElement?.parentElement).toHaveClass('bg-yellow-50')
      expect(element.parentElement?.children[0].children[0]).toHaveClass('text-yellow-400')
    })
  })
})
