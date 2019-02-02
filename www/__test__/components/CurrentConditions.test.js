import React from 'react'
import { render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'
import CurrentConditions from '../../components/CurrentConditions'

afterEach(cleanup)
const props = {
  forecastSummary:
    'Light rain tomorrow through Monday, with high temperatures falling to 40°F on Monday.',

  conditions: {
    summary: 'It is raining outside',
    icon: 'rain',
    temperature: 49.7,
    apparentTemperature: 52.3,
  },
}

function renderCurrentConditions() {
  return render(<CurrentConditions {...props} />)
}

describe('CurrentConditions', () => {
  it('renders a rainbow to indicate loading state if no conditions are passed', () => {
    const { getByText } = render(<CurrentConditions />)
    getByText('🌈')
  })

  it('renders the forecast summary for the next few days', () => {
    renderCurrentConditions().getByText(props.forecastSummary)
  })

  it('renders a weather summary and shows apparent temperature', () => {
    const txt = props.conditions.summary + ', feels like'
    const container = renderCurrentConditions().getByText(txt)
    expect(container.firstElementChild.textContent).toEqual('52˚')
  })

  it('renders the appropriate icon', () => {
    const { getByTestId } = renderCurrentConditions()
    expect(getByTestId('weather-icon').className).toEqual(
      'wi wi-forecast-io-rain',
    )
  })

  it('gives the temperature as a round number', () => {
    const { getByTestId } = renderCurrentConditions()
    expect(getByTestId('test-temp').textContent).toEqual(' 50˚')
  })
})
