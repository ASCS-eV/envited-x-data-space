import { useSession } from 'next-auth/react'
import React from 'react'
import TestRenderer, { ReactTestRendererJSON } from 'react-test-renderer'

import { HeroHeader } from './HeroHeader'

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
      mockUseSession.mockReturnValue({})
      const component = TestRenderer.create(<HeroHeader />)

      // then ... should render with expected css class
      const tree = component.toJSON() as ReactTestRendererJSON

      expect(tree.props.className).toContain('mx-auto')
    })
  })
})
