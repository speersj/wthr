import React from 'react'
import PropTypes from 'prop-types'
import { Subscribe } from 'unstated'

import PageRoot from '../layout/PageRoot'
import WeatherContainer from '../containers/WeatherContainer'
import Location from '../components/Location'
import WeatherStatsBar from '../components/WeatherStatsBar'
import CurrentConditions from '../components/CurrentConditions'

Index.propTypes = { host: PropTypes.string.isRequired }

export default function Index(props) {
  return (
    <PageRoot title="wthr">
      <Subscribe to={[WeatherContainer]}>
        {container => (
          <>
            <Location container={container} {...props} />
            <WeatherStatsBar
              title={container.state.location}
              {...container.state.weather.currently}
            />

            <CurrentConditions
              conditions={container.state.weather.currently}
              forecastSummary={container.state.weather.daily.summary}
            />
          </>
        )}
      </Subscribe>
    </PageRoot>
  )
}
