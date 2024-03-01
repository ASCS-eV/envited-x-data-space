import { render } from '@testing-library/react'

import { Profile } from './Profile'

describe('Profile', () => {
  it('should render successfully', () => {
    const profile = {
      id: 'USER_ID',
      name: 'NAME',
      slug: 'name',
      description: 'DESCRIPTION',
      logo: 'LOGO',
      streetAddress: 'STREET_ADDRESS',
      postalCode: 'POSTAL_CODE',
      addressLocality: 'ADDRESS_LOCALITY',
      addressCountry: 'ADDRESS_COUNTRY',
      firstName: 'FIRST_NAME',
      lastName: 'LAST_NAME',
      phone: 'PHONE',
      email: 'EMAIL',
      website: 'WEBSITE',
      offerings: [],
      isPublished: true,
    }

    const { baseElement } = render(
      <Profile profile={profile} profileBusinessCategories={[]} businessCategories={['CATEGORY']} />,
    )
    expect(baseElement).toBeTruthy()
  })
})
