import { useSession } from 'next-auth/react'
import React from 'react'

import { HeroHeader } from './HeroHeader'
import { render } from '@testing-library/react'

jest.mock('next-auth/react')

const mockUseSession = useSession as jest.Mock

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    }
  },
}))

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    has: jest.fn(),
  }),
}))

describe('modules/HeroHeader', () => {
  describe('render', () => {
    it('should return as expected', async () => {
      // when ... rendering component
      // then ... should render with expected css class
      
      mockUseSession.mockReturnValue({})
      const { container } = render(<HeroHeader />)
      
      expect(container.firstChild).toHaveClass('mx-auto max-w-6xl')
    })
  })
})
