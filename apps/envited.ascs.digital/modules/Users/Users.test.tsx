import { render } from '@testing-library/react'

import { Users } from './Users'

describe('Users', () => {
  it('should render successfully', () => {
    const USERS_MAP = [{
      name: 'John Johnson',
      email: 'j.johnson@ascs.digital',
      id: 'did:pkh:tz:tz1SfdVU1mor3Sgej3FmmwMH4HM1EjTzqqeE',
    }]

    const { baseElement } = render(<Users users={USERS_MAP} />)
    expect(baseElement).toBeTruthy()
  })
})
