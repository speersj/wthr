import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box, Text } from 'rebass'
import WeatherIcon from './WeatherIcon'
import { toDayOfWeek, toDate, toTime } from '../lib/dateTime'
import Temperature from './Temperature'
import TextCentered from './TextCentered'
import Title from './Title'
import TitleBig from './TitleBig'
import TextBoxCentered from './TextBoxCentered'
import Icon from './Icon'
import MoonPhaseIcon, { moonPhaseName } from './MoonPhase'
import TextSmall from './TextSmall'
import RotatedSpan from './RotatedSpan'
import Percentage from './Percentage'
import UVIndex from './UVIndex'
import { capitalize } from '../lib/utils'

DailyForecast.propTypes = {
  time: PropTypes.number, // unix time
  summary: PropTypes.string,
  icon: PropTypes.string,

  temperatureLow: PropTypes.number,
  temperatureHigh: PropTypes.number,

  sunriseTime: PropTypes.number, // unix time
  sunsetTime: PropTypes.number, // unix time
  moonPhase: PropTypes.number,

  precipProbability: PropTypes.number, // percentage
  precipIntensity: PropTypes.number, // inches / hour
  precipType: PropTypes.string, // rain / snow etc

  windSpeed: PropTypes.number, // mph
  windBearing: PropTypes.number, // direction 0->360
  cloudCover: PropTypes.number, // percentage

  dewPoint: PropTypes.number, // deg f
  humidity: PropTypes.number, // percentage
  pressure: PropTypes.number, // millibars

  uvIndex: PropTypes.number,
  visibility: PropTypes.number, // up to 10 miles
}

const Cell = props => (
  <TextBoxCentered width={1 / 3} fontSize={[3, 4]} {...props} my={3}>
    {props.children}
  </TextBoxCentered>
)

Cell.propTypes = { children: PropTypes.node }

export default function DailyForecast(props) {
  const { time } = props

  if (time == undefined) {
    return (
      <Box width={1} bg="bgEm">
        <TitleBig>🌈</TitleBig>
      </Box>
    )
  }

  return (
    <Box width={1} bg="bgEm">
      <Title color="text">{`${toDayOfWeek(time)}, ${toDate(time)}`}</Title>
      <TitleBig>
        <WeatherIcon name={props.icon} />
      </TitleBig>

      <TextBoxCentered p={2} mb={4} fontSize={[2, 3]}>
        <Temperature value={props.temperatureHigh} color="hot" inline />{' '}
        <Temperature value={props.temperatureLow} color="cold" inline />
        <TextCentered fontSize={[2, 3]} my={2} color="accent2">
          {props.summary}
        </TextCentered>
        {props.precipProbability === 0 ? (
          <Text mt={2}>No Precipitation</Text>
        ) : (
          <>
            <Text mt={2} color="rainy">
              <Percentage value={props.precipProbability} inline /> Chance of{' '}
              {capitalize(props.precipType || 'Precipitation')},{' '}
              {(props.precipIntensity * 24).toFixed(2)} in
            </Text>
          </>
        )}
        <Text color="cloudy" mt={2}>
          <Percentage value={props.cloudCover} inline /> Cloudy
        </Text>
      </TextBoxCentered>

      <Flex flexWrap="wrap" justifyContent="space-evenly" alignItems="center">
        <Cell width={1 / 3} color="orange">
          <Icon name="sunrise" />
          <TextSmall>{toTime(props.sunriseTime)}</TextSmall>
        </Cell>

        <Cell width={1 / 3} color="textMuted">
          <Icon name="sunset" />
          <TextSmall>{toTime(props.sunsetTime)}</TextSmall>
        </Cell>

        <Cell width={1 / 3} color="contrast">
          <span data-testid="moon-phase-icon">
            <MoonPhaseIcon moonPhase={props.moonPhase} />
          </span>
          <TextSmall>{moonPhaseName(props.moonPhase)}</TextSmall>
        </Cell>

        <Cell width={1 / 3}>
          <TextSmall>Wind</TextSmall>
          <TextSmall>
            {Math.round(props.windSpeed)}mph
            <RotatedSpan angle={props.windBearing || 0}> ⬆ ️</RotatedSpan>
          </TextSmall>
        </Cell>

        <Cell width={1 / 3}>
          <TextSmall>
            Dew Point
            <Temperature value={props.dewPoint} />
          </TextSmall>
        </Cell>

        <Cell width={1 / 3}>
          <TextSmall>Humidity</TextSmall>
          <TextSmall>
            <Percentage value={props.humidity} />
          </TextSmall>
        </Cell>

        <Cell width={1 / 3}>
          <TextSmall>Pressure</TextSmall>
          <TextSmall>{Math.round(props.pressure)}mb</TextSmall>
        </Cell>

        <Cell width={1 / 3}>
          <TextSmall>Visibility</TextSmall>
          <TextSmall>{visibilityText(props.visibility)}</TextSmall>
        </Cell>

        <Cell width={1 / 3}>
          <TextSmall>
            <UVIndex uvIndex={props.uvIndex} />
          </TextSmall>
        </Cell>
      </Flex>
    </Box>
  )
}

function visibilityText(visibility) {
  const vis = Math.round(visibility)
  return vis >= 10 ? '> 10 miles' : `${vis} miles`
}
