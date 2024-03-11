import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { Footer } from './Footer'

describe('Footer', () => {
  it('should render successfully', () => {
    // when ... rendering component
    // then ... should render as expected
    const { getByText } = render(<Footer />)
    expect(getByText('Envited')).toBeInTheDocument()
  })
})
