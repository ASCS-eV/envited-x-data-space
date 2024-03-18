import * as SUT from './Breadcrumbs.utils'

describe('Breadcrumbs/utils', () => {
  describe('formatBreadcrumbUri', () => {
    it('should return the url', () => {
      // when ... we want to format a url from a array of paths
      // then ... we should get the url as expected
      const pathNames = ['assets', 'detail']
      const result = SUT.formatBreadcrumbUri(pathNames)(0)

      expect(result).toEqual('/assets')
    })

    it('should return the url of second level', () => {
      // when ... we want to format a url from a array of paths
      // then ... we should get the url as expected
      const pathNames = ['assets', 'detail']
      const result = SUT.formatBreadcrumbUri(pathNames)(1)

      expect(result).toEqual('/assets/detail')
    })
  })

  describe('formatBreadcrumbLabel', () => {
    it('should format a label from the slug', () => {
      // when ... we want to get a label from a path
      // then ... we should get the label as expected
      const result = SUT.formatBreadcrumbLabel('breadcrumb-label' as any)

      expect(result).toEqual('Breadcrumb label')
    })
  })
})
