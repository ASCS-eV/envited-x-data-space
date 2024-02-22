import { render, screen } from '@testing-library/react'

import ContactPerson from './ContactPerson'

describe('compoments/Atoms/ContactPerson', () => {
  it('should render Contact Person details', () => {
    // when ... rendering component
    const name = 'NAME'
    const phone = 'PHONE_NUMBER'
    const email = 'EMAIL_ADDRESS'

    render(<ContactPerson name={name} phone={phone} email={email} />)

    const AddressElement = screen.getByText(name)

    // then ... should render as expected
    expect(AddressElement).toBeInTheDocument()
  })
})
