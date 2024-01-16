/* eslint-disable no-global-assign */
/* eslint-disable no-native-reassign */

import '@testing-library/jest-dom'

import * as SUT from './utils'

describe('common/utils', () => {
  describe('isUp', () => {
    it.each([
      [-1, false],
      [0, true],
      [1, true],
    ])('should, with value %i, return %s as expected', (value, result) => {
      // when ... we provide a value
      // then ... it should return as expected
      expect(SUT.isUp(value)).toEqual(result)
    })
  })

  describe('formatPercentage', () => {
    it('should add a percentage to the number value', () => {
      // when ... we provide a value
      const result = SUT.formatPercentage(0.01)
      const expected = '1%'

      // then ... it should return as expected
      expect(result).toEqual(expected)
    })
  })

  describe('formatAmount', () => {
    it.each([
      [2000, '2,000'],
      [3, '3'],
      [1000000, '1,000,000'],
      [0.12, '0.12'],
      [0.00123456, '0.0012'],
      [-1000000, '-1,000,000'],
      [-0.12, '-0.12'],
      [-0.00123456, '-0.0012'],
    ])('should, with value %s, return %s as expected', (value, result) => {
      // when ... we provide a value
      // then ... it should return as expected
      expect(SUT.formatAmount(value)).toEqual(result)
    })
  })

  describe('formatDate', () => {
    it.each([
      ['1970-01-01T00:00:00Z', 'January 1, 1970'],
      ['2021-09-27T10:26:14Z', 'September 27, 2021'],
    ])('should, with value %s, return %s as expected', (date, result) => {
  
      // when ... we provide a value
      // then ... it should return as expected
      expect(SUT.formatDate(date)).toEqual(result)
    })
  })

  describe('getISODate', () => {
    it.each([
      ['2022-01-11 16:13:50', '2022-01-11T16:13:50.000Z'],
      ['2022-01-11T16:13:50Z', '2022-01-11T16:13:50.000Z'],
    ])('should, with value %s, return %s as expected', (date, result) => {
      // when ... we provide a value
      // then ... it should return as expected
      expect(SUT.getISODate(date)).toBe(result)
    })
  })

  describe('formatDateTime', () => {
    it.each([
      ['1970-01-01T00:00:00Z', 'January 1, 1970 at 12:00 AM'],
      ['2021-09-27T10:26:14Z', 'September 27, 2021 at 10:26 AM'],
      ['2022-01-11 16:13:50', 'January 11, 2022 at 04:13 PM'],
      ['2022-01-11T16:13:50Z', 'January 11, 2022 at 04:13 PM'],
    ])('should, with value %s, return %s as expected', (date, result) => {
      // when ... we provide a value
      // then ... it should return as expected
      expect(SUT.formatDateTime(date)).toEqual(result)
    })
  })

  describe('formatShortDate', () => {
    it.each([
      ['1970-01-01T00:00:00Z', 'Jan 1, 1970'],
      ['2021-09-27T10:26:14Z', 'Sep 27, 2021'],
    ])('should, with value %s, return %s as expected', (date, result) => {
      // when ... we provide a value
      // then ... it should return as expected
      expect(SUT.formatShortDate(date)).toEqual(result)
    })
  })

  describe('ipfsToHttps', () => {
    it.each([
      ['ipfs://hash', 'https://ipfs.io/ipfs/hash'],
      ['https://stakenow.fi/hash', 'https://stakenow.fi/hash'],
    ])('should, with value %s, return %s as expexted', (url, result) => {
      // when ... we provide a value
      // then ... it should return as expected
      expect(SUT.ipfsToHttps(url)).toEqual(result)
    })
  })

  describe('calculateProfitPercentage', () => {
    it.each([
      [2, 1],
      [3, 2],
      [0.5, -0.5],
    ])('should, with value %s, return %s as expected', (value, result) => {
      // when ... we provide a value
      // then ... it should return as expected
      expect(SUT.calculateProfitPercentage(1)(value)).toEqual(result)
    })
  })

  describe('chunkString', () => {
    it('should split up the string into array based on provided chunk size', () => {
      // when ... we provide a chunksize and string
      // then ... it should return array as expected
      expect(SUT.chunkString(6)('aaaaaabbbbbbcccccc')).toEqual(['aaaaaa', 'bbbbbb', 'cccccc'])
    })
  })
})
