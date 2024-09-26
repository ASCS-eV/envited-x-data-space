import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import React from 'react'

import { Header } from './Header'

jest.mock('next-auth/react')

const mockUseSession = useSession as jest.Mock

describe('Header', () => {
  it('should render successfully', () => {
    // when ... rendering component
    // then ... should render as expected
    mockUseSession.mockReturnValue({})
    const { getByText } = render(<Header />)
    expect(getByText('Connect')).toBeInTheDocument()
  })
})
