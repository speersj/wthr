import isEmpty from '../../lib/isEmpty'

describe('isEmpty', () => {
  it('returns false if an object is not empty', () => {
    expect(isEmpty({ test: false })).toBeFalsy()
  })

  it('returns true if object is not empty', () => {
    expect(isEmpty({})).toBeTruthy()
  })

  it('returns true if value is undefined', () => {
    expect(isEmpty(undefined)).toBeTruthy()
  })

  it('returns true if value is null', () => {
    expect(isEmpty(null)).toBeTruthy()
  })

  it('returns false for an array that is not empty', () => {
    expect(isEmpty([1, 2, 3])).toBeFalsy()
  })

  it('returns true for an empty array', () => {
    expect(isEmpty([])).toBeTruthy()
  })
})
