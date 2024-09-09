import { render } from '@testing-library/react'

import { DashboardMembers } from './DashboardMembers'

describe('DashboardMembers', () => {
  it('should render successfully', () => {
    const MEMBERS_MAP = [
      {
        name: 'John Johnson',
        email: 'j.johnson@ascs.digital',
        id: 'did:pkh:tz:tz1SfdVU1mor3Sgej3FmmwMH4HM1EjTzqqeE',
      },
    ]

    const { baseElement } = render(<DashboardMembers members={MEMBERS_MAP} />)
    expect(baseElement).toBeTruthy()
  })
})
