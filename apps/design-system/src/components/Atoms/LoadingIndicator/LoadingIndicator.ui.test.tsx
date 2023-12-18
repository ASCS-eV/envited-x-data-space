import { render, screen } from '@testing-library/react'
import React from 'react'

import { Colour, Size } from '../../../types'
import LoadingIndicator from './LoadingIndicator'

describe('components/LoadingIndicator', () => {
  it('should render LoadingIndicator with default properties', () => {
    // when ... rendering component
    render(<LoadingIndicator />)
    const element = screen.getByTitle('Loading Indicator')

    // then ... should render with expected properties
    expect(element).toBeInTheDocument()
    expect(element.closest('svg')).toHaveClass('text-orange')
  })

  it('should render LoadingIndicator with specific properties', () => {
    // when ... rendering component
    render(<LoadingIndicator size={Size.small} colour={Colour.black} />)
    const element = screen.getByTitle('Loading Indicator')

    // then ... should render with expected properties
    expect(element).toBeInTheDocument()
    expect(element.closest('svg')).toHaveClass('h-3.5')
    expect(element.closest('svg')).toHaveClass('text-black')
  })
})
