import React from 'react'
import TestRenderer from 'react-test-renderer'

import ThemeToggle from './ThemeToggle'

describe('modules/ThemeToggle', () => {
  describe('render', () => {
    it('should render as expected', async () => {
      // when ... rendering component
      const component = TestRenderer.create(<ThemeToggle />)

      // then ... should render with expected element type
      const tree = component.toJSON() as any
      expect(tree.children[0].type).toEqual('svg')
    })
  })
})
