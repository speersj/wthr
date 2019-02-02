import React from 'react'
import PropTypes from 'prop-types'
import theme from '../lib/theme'

WeatherIcon.propTypes = { name: PropTypes.string.isRequired }

export default function WeatherIcon({ name }) {
  return (
    <i
      style={{ color: theme.colors[name] || theme.colors.text }}
      data-testid="weather-icon"
      className={iconClassName(name)}
    />
  )
}

function iconClassName(iconName) {
  return `wi wi-forecast-io-${iconName}`
}
