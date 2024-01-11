import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { Header } from './Header'

describe('Header', () => {
  it('should render successfully', () => {
    // when ... rendering component
    // then ... should render as expected
    const { getByText } = render(<Header />)
    expect(getByText('Connect')).toBeInTheDocument()
  })
})
