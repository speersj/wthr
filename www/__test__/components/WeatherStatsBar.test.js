import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'
import WeatherStatsBar from '../../components/WeatherStatsBar'

afterEach(cleanup)

const props = {
  windSpeed: 4,
  windBearing: 45,
  humidity: 0.8,
  dewPoint: 45,
  uvIndex: 4,
}

const wsb = () => render(<WeatherStatsBar {...props} />)

describe('wind', () => {
  it('rotates a character based on wind direction', () => {
    const { getByText, getByTestId } = wsb()
    getByText('Winds')
    getByTestId('rotated-span-45')
  })

  it('displays wind as mph', () => {
    wsb().getByText(/4*mph/)
  })

  it('renders humidity as a percentage', () => {
    const pct = wsb().getByText('Humidity').firstElementChild.textContent
    expect(pct).toEqual('80%')
  })

  it('renders dew point as a temperature', () => {
    const el = wsb().getByText('Dew Pt')
    expect(el.firstElementChild.textContent).toEqual('45˚')
  })

  it('renders the UV Index', () => {
    wsb().getByText('UV 4')
  })
})
