import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from 'rebass'
import { isEmpty } from '../lib/utils'
import ForecastThumbnail from './ForecastThumbnail'
import DailyForecast from './DailyForecast'

export default class Forecast extends Component {
  // all directions set true north at 0° and progress clockwise
  // all percentages range from 0 to 1
  // dates / times are unix time in seconds
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        time: PropTypes.number,
        summary: PropTypes.string,
        icon: PropTypes.string,

        sunriseTime: PropTypes.number,
        sunsetTime: PropTypes.number,
        moonPhase: PropTypes.number,

        precipIntensity: PropTypes.number, // inches / hour, * 24 for daily
        precipProbability: PropTypes.number, // percentage
        precipType: PropTypes.string, // rain / snow etc

        temperatureHigh: PropTypes.number, // degrees fahrenheit
        temperatureLow: PropTypes.number, // degree fahrenheit

        dewPoint: PropTypes.number, // deg f
        humidity: PropTypes.number, // percentage
        pressure: PropTypes.number, // millibars

        windSpeed: PropTypes.number, // mph
        windBearing: PropTypes.number, // direction 0->360
        cloudCover: PropTypes.number, // percentage

        uvIndex: PropTypes.number,
        visibility: PropTypes.number, // up to 10 miles
      }),
    ),
  }

  state = {
    focusedData: {}, // data for day we are viewing
  }

  thumbnailClick = timeStamp => {
    const focusedData = this.props.data.find(day => day.time === timeStamp)
    this.setState({ focusedData })
  }

  componentDidUpdate = prevProps => {
    const { data } = this.props
    if (isEmpty(prevProps.data) && !isEmpty(data))
      this.setState({ focusedData: data[0] })
  }

  render() {
    const isLoading =
      isEmpty(this.props.data) || isEmpty(this.state.focusedData)

    const { data } = this.props

    return (
      <>
        <Flex
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          {data.map(day => (
            <ForecastThumbnail
              {...day}
              active={day.time === this.state.focusedData.time}
              key={day.time}
              onClick={() => {
                this.thumbnailClick(day.time)
              }}
            />
          ))}
        </Flex>
        <Box my={3} width={1}>
          {isLoading || <DailyForecast {...this.state.focusedData} />}
        </Box>
      </>
    )
  }
}
