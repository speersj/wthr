import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'
import WeatherIcon from '../../components/WeatherIcon'

afterEach(cleanup)

describe('WeatherIcon', () => {
  it('outputs an i element with the correct classNames', () => {
    const { getByTestId } = render(<WeatherIcon name="clear-day" />)
    const { className } = getByTestId('weather-icon')
    expect(className).toEqual('wi wi-forecast-io-clear-day')
  })

  it('outputs correct html', () => {
    const { getByTestId } = render(<WeatherIcon name="rain" />)
    expect(getByTestId('weather-icon')).toMatchSnapshot()
  })
})
