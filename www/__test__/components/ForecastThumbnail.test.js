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
    const { getByRole } = render(<ForecastThumbnail {...props} />)
    expect(getByRole('img').className).toEqual('wi wi-forecast-io-sunny')
  })

  it('renders the high temperature', () => {
    render(<ForecastThumbnail {...props} />).getByText('85˚')
  })

  it('renders the low temperature', () => {
    render(<ForecastThumbnail {...props} />).getByText('62˚')
  })

  it('renders the day of the week', () => {
    render(<ForecastThumbnail {...props} />).getByText('Fri')
  })

  it('responds to click events', () => {
    const { getByText } = render(<ForecastThumbnail {...props} />)
    fireEvent.click(getByText('Fri'))
    expect(props.onClick).toHaveBeenCalled()
  })
})
