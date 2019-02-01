import { forecastURL, geocodeURL, reverseGeocodeURL } from '../../lib/apiURLs'

describe('forecastURL', () => {
  it('returns the correct API endpoint URL on localhost', () => {
    expect(forecastURL('localhost:3000', 45, 90)).toEqual(
      'http://localhost:8010?lat=45&lng=90',
    )
  })

  it('returns the correct API endpoint URL when deployed', () => {
    expect(forecastURL('test.com', 45, 90)).toEqual(
      'https://test.com/api/forecast?lat=45&lng=90',
    )
  })
})

describe('geocodeURL', () => {
  it('returns the correct API endpoint URL on localhost', () => {
    expect(geocodeURL('localhost:3000', 'Portland')).toEqual(
      'http://localhost:8020?q=Portland',
    )
  })

  it('returns the correct API endpoint URL when deployed', () => {
    expect(geocodeURL('test.com', 'Portland')).toEqual(
      'https://test.com/api/geocode?q=Portland',
    )
  })

  it('escapes spaces in the query term', () => {
    expect(geocodeURL('test.com', 'Portland, OR')).toEqual(
      'https://test.com/api/geocode?q=Portland,%20OR',
    )
  })
})

describe('reverseGeocodeURL', () => {
  it('returns the correct API endpoint URL on localhost', () => {
    expect(reverseGeocodeURL('localhost:3000', 45, 90)).toEqual(
      'http://localhost:8030?lat=45&lng=90',
    )
  })

  it('returns the correct API endpoint URL when deployed', () => {
    expect(reverseGeocodeURL('test.com', 45, 90)).toEqual(
      'https://test.com/api/reverse-geocode?lat=45&lng=90',
    )
  })
})
