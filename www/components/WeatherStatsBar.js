import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from 'rebass'
import RotatedSpan from './RotatedSpan'
import TextBoxCentered from './TextBoxCentered'
import Temperature from './Temperature'
import Percentage from './Percentage'
import UVIndex from './UVIndex'
import TextSmall from './TextSmall'

WeatherStatsBar.propTypes = {
  windSpeed: PropTypes.number,
  windBearing: PropTypes.number,
  humidity: PropTypes.number,
  dewPoint: PropTypes.number,
  uvIndex: PropTypes.number,
}

export default function WeatherStatsBar(props) {
  const { round } = Math
  const { windSpeed, windBearing, humidity, dewPoint, uvIndex } = props
  const is = x => x != undefined

  return (
    <Box width={1} bg="bgEm" fontSize={[1, 2]} color="text" p={1}>
      <Flex alignItems="center" justifyContent="space-evenly">
        <TextBoxCentered width={1 / 4}>
          <TextSmall>Winds</TextSmall>
          <RotatedSpan angle={windBearing || 0}>️️️️️ ⬆ ️</RotatedSpan>
          {is(windSpeed) && round(windSpeed)}mph
        </TextBoxCentered>

        <TextBoxCentered width={1 / 4}>
          Humidity {is(humidity) && <Percentage value={humidity} />}
        </TextBoxCentered>

        <TextBoxCentered width={1 / 4}>
          Dew Pt {is(dewPoint) && <Temperature value={dewPoint} />}
        </TextBoxCentered>

        <TextBoxCentered width={1 / 4}>
          <UVIndex uvIndex={uvIndex} />
        </TextBoxCentered>
      </Flex>
    </Box>
  )
}
