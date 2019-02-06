import React from 'react'
import PropTypes from 'prop-types'
import { Heading, Text } from 'rebass'
import WeatherIcon from './WeatherIcon'
import Temperature from './Temperature'
import TextBoxCentered from './TextBoxCentered'

CurrentConditions.propTypes = {
  forecastSummary: PropTypes.string,
  summary: PropTypes.string,
  icon: PropTypes.string,
  temperature: PropTypes.number,
  apparentTemperature: PropTypes.number,
}

CurrentConditions.defaultProps = { conditions: {} }

export default function CurrentConditions(props) {
  const { icon, temperature, summary, apparentTemperature } = props

  return (
    <TextBoxCentered py={4} width={1} mx="auto">
      <Heading py={3} fontSize={[5, 6]} color={icon}>
        {icon ? <WeatherIcon name={icon} /> : '🌈'}
        <span data-testid="test-temp">
          {' '}
          {temperature && (
            <Temperature value={temperature} color={icon || 'textEm'} />
          )}
        </span>
      </Heading>
      <Text py={3} fontSize={[2, 3]} color="accent2">
        {summary && `${summary}, feels like `}{' '}
        {apparentTemperature && (
          <Temperature value={apparentTemperature} inline />
        )}
      </Text>
      <Text fontSize={[3, 4]} color="accent">
        {props.forecastSummary}
      </Text>
    </TextBoxCentered>
  )
}
