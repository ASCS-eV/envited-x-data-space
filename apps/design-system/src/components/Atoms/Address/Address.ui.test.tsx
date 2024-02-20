import { render, screen } from '@testing-library/react'

import Address from './Address'

describe('compoments/Atoms/Address', () => {
  it('should render Address', () => {
    // when ... rendering component
    const street = 'STREET'
    const city = 'CITY'
    const postalCode = 'POSTAL_CODE'
    const country = 'COUNTRY'
    const phone = '+123456789'
    const email = 'EMAIL_ADDRESS'

    render(
      <Address street={street} city={city} postalCode={postalCode} country={country} phone={phone} email={email} />,
    )

    const AddressElement = screen.getByText(phone)

    // then ... should render as expected
    expect(AddressElement).toBeInTheDocument()
  })
})
