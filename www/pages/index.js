import React from 'react'
import PropTypes from 'prop-types'
import { Subscribe } from 'unstated'

import PageRoot from '../layout/PageRoot'
import LocationContainer from '../containers/LocationContainer'
import Location from '../components/Location'
import WeatherStatsBar from '../components/WeatherStatsBar'
import CurrentConditions from '../components/CurrentConditions'
import Forecast from '../components/Forecast'
import WeatherContainer from '../containers/WeatherContainer'
import Weather from '../components/Weather'

Index.propTypes = { host: PropTypes.string.isRequired }

export default function Index(props) {
  return (
    <PageRoot title="wthr">
      <Subscribe to={[LocationContainer, WeatherContainer]}>
        {(location, weather) => {
          const { currently, daily } = weather.state
          const { lat, lng } = location.state
          return (
            <Weather container={weather} lat={lat} lng={lng} {...props}>
              <Location container={location} {...props} />
              <WeatherStatsBar {...currently} />
              <CurrentConditions {...currently} forecast={daily.summary} />
              <Forecast data={daily.data.slice(0, 6)} />
            </Weather>
          )
        }}
      </Subscribe>
    </PageRoot>
  )
}
