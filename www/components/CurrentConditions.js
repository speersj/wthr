import React from 'react'
import PropTypes from 'prop-types'
import { Heading, Text } from 'rebass'
import WeatherIcon from './WeatherIcon'
import { isNotEmpty } from '../lib/utils'
import Temperature from './Temperature'
import TextBoxCentered from './TextBoxCentered'

CurrentConditions.propTypes = {
  forecastSummary: PropTypes.string,
  conditions: PropTypes.shape({
    summary: PropTypes.string,
    icon: PropTypes.string,
    temperature: PropTypes.number,
    apparentTemperature: PropTypes.number,
  }),
}

export default function CurrentConditions(props) {
  const isLoaded = isNotEmpty(props.conditions)
  const { conditions } = props
  return (
    <TextBoxCentered py={4} width={1} mx="auto">
      <Heading py={3} fontSize={[5, 6]} color={conditions && conditions.icon}>
        {isLoaded ? <WeatherIcon name={conditions.icon} /> : '🌈'}
        <span data-testid="test-temp">
          {' '}
          {isLoaded && (
            <Temperature
              value={conditions.temperature}
              color={conditions.icon || 'textEm'}
            />
          )}
        </span>
      </Heading>
      <Text py={3} fontSize={[2, 3]} color="accent2">
        {isLoaded && `${conditions.summary}, feels like `}{' '}
        {isLoaded && (
          <Temperature value={conditions.apparentTemperature} inline />
        )}
      </Text>
      <Text fontSize={[3, 4]} color="accent">
        {props.forecastSummary}
      </Text>
    </TextBoxCentered>
  )
}
