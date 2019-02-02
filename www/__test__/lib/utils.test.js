import { isEmpty, negate, isNotEmpty } from '../../lib/utils'

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

describe('negate', () => {
  it('should output a function that always returns the opposite as its input function', () => {
    const dummy = () => true
    const isDefined = x => typeof x !== 'undefined'
    expect(negate(dummy)()).toBeFalsy()
    expect(negate(isDefined)(undefined)).toBeTruthy()
  })
})

describe('isNotEmpty', () => {
  it('returns true if an object is not empty', () => {
    expect(isNotEmpty({ test: false })).toBeTruthy()
  })

  it('returns false if object is not empty', () => {
    expect(isNotEmpty({})).toBeFalsy()
  })

  it('returns false if value is undefined', () => {
    expect(isNotEmpty(undefined)).toBeFalsy()
  })

  it('returns false if value is null', () => {
    expect(isNotEmpty(null)).toBeFalsy()
  })

  it('returns true for an array that is not empty', () => {
    expect(isNotEmpty([1, 2, 3])).toBeTruthy()
  })

  it('returns false for an empty array', () => {
    expect(isNotEmpty([])).toBeFalsy()
  })
})
