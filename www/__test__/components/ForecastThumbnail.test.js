import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
import ForecastThumbnail from '../../components/ForecastThumbnail'

afterEach(cleanup)

const props = {
  icon: 'sunny',
  onClick: jest.fn(),
  active: false,
  temperatureHigh: 85,
  temperatureLow: 62,
  time: 1547798400, // 'Friday, January 18, 2019'
}

describe('ForecastThumbnail', () => {
  it('renders the correct icon', () => {
    render(<ForecastThumbnail {...props} />).getByTestId('weather-icon')
  })

  it('renders the high temperature', () => {
    render(<ForecastThumbnail {...props} />).getByText('85˚')
  })

  it('renders the low temperature', () => {
    render(<ForecastThumbnail {...props} />).getByText('62˚')
  })

  it('renders the date', () => {
    render(<ForecastThumbnail {...props} />).getByText('Jan 18')
  })

  it('responds to click events', () => {
    const { getByText } = render(<ForecastThumbnail {...props} />)
    fireEvent.click(getByText('Jan 18'))
    expect(props.onClick).toHaveBeenCalled()
  })
})
