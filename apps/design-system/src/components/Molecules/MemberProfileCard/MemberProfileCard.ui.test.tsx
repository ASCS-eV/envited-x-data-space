import { render, screen } from '@testing-library/react'
import React from 'react'

import Pill from '../../Atoms/Pill/Pill'
import MemberProfileCard from './MemberProfileCard'

describe('compoments/Molecules/MemberProfileCard', () => {
  it('should render a Member Card with the title', () => {
    // when ... rendering component
    const title = 'TITLE'
    const logoUri = 'https://source.unsplash.com/random'
    const street = 'STREET'
    const city = 'CITY'
    const postalCode = 'POSTAL_CODE'
    const country = 'COUNTRY'

    render(
      <MemberProfileCard
        title={title}
        logoUri={logoUri}
        street={street}
        city={city}
        postalCode={postalCode}
        country={country}
        businessCategories={
          <>
            <Pill>OEM</Pill>
            <Pill>Supplier</Pill>
          </>
        }
      />,
    )

    const CardElement = screen.getByText(title)

    // then ... should render as expected
    expect(CardElement).toBeInTheDocument()
  })
})
