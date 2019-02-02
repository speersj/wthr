import React from 'react'
import PropTypes from 'prop-types'
import { capitalize } from '../lib/utils'

MoonPhaseIcon.propTypes = { moonPhase: PropTypes.number }
MoonPhaseIcon.defaultProps = { moonPhase: 0 }

/**
 *
 * @param {Number} moonPhase - 0 -> 1 moonPhase from darksky api
 */
export default function MoonPhaseIcon({ moonPhase }) {
  const title = moonPhaseName(moonPhase) + ' Moon'
  return (
    <i title={title} role="img" className={moonPhaseClassName(moonPhase)} />
  )
}

/**
 *
 * @param {number} moonPhase value from darkSky API
 * @returns {string} name of moon phase, ex 'Waxing Crescent', 'Full', etc
 */
export function moonPhaseName(moonPhase) {
  return moonPhaseClassName(moonPhase)
    .replace('wi wi-moon-', '')
    .replace(/-\d/, '')
    .split('-')
    .map(capitalize)
    .join(' ')
}

/**
 *
 * @param {number} moonPhase
 * @returns {string} class name for displaying weather icon
 */
export function moonPhaseClassName(moonPhase) {
  return (
    'wi ' +
    [
      'wi-moon-new',
      'wi-moon-waxing-crescent-1',
      'wi-moon-waxing-crescent-2',
      'wi-moon-waxing-crescent-3',
      'wi-moon-waxing-crescent-4',
      'wi-moon-waxing-crescent-5',
      'wi-moon-waxing-crescent-6',

      'wi-moon-first-quarter',
      'wi-moon-waxing-gibbous-1',
      'wi-moon-waxing-gibbous-2',
      'wi-moon-waxing-gibbous-3',
      'wi-moon-waxing-gibbous-4',
      'wi-moon-waxing-gibbous-5',
      'wi-moon-waxing-gibbous-6',

      'wi-moon-full',
      'wi-moon-waning-gibbous-1',
      'wi-moon-waning-gibbous-2',
      'wi-moon-waning-gibbous-3',
      'wi-moon-waning-gibbous-4',
      'wi-moon-waning-gibbous-5',
      'wi-moon-waning-gibbous-6',

      'wi-moon-third-quarter',
      'wi-moon-waning-crescent-1',
      'wi-moon-waning-crescent-2',
      'wi-moon-waning-crescent-3',
      'wi-moon-waning-crescent-4',
      'wi-moon-waning-crescent-5',
      'wi-moon-waning-crescent-6',
    ][Math.floor(moonPhase * 28)]
  )
}
