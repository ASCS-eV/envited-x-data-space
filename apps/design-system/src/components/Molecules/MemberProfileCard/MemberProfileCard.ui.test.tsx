import { render, screen } from '@testing-library/react'
import React from 'react'

import MemberProfileCard from './MemberProfileCard'

describe('compoments/Molecules/MemberProfileCard', () => {
  it('should render a Member Card with the title', () => {
    // when ... rendering component
    const title = 'TITLE'
    const logoUri = 'https://source.unsplash.com/random'

    render(<MemberProfileCard title={title} logoUri={logoUri} />)

    const CardElement = screen.getByText(title)

    // then ... should render as expected
    expect(CardElement).toBeInTheDocument()
  })
})
