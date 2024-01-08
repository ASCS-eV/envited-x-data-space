import { render } from '@testing-library/react'

import { ExampleTable } from './ExampleTable'

describe('ExampleTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExampleTable />)
    expect(baseElement).toBeTruthy()
  })
})
