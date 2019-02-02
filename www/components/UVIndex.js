import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'

UVIndex.propTypes = { uvIndex: PropTypes.number }

export default function UVIndex(props) {
  return <Text {...uvColor(props.uvIndex)}>UV {props.uvIndex}</Text>
}

/**
 * returns the color to display the UV Index value in
 * according to the UV Index Scale
 * https://www.epa.gov/sunsafety/uv-index-scale-1
 * @param {number} uv uv index value, 0->12
 */
export function uvColor(uv) {
  if (uv == undefined) return { color: 'uvColor0' }
  const val = uv <= 12 ? uv : 12
  return { color: `uvColor${val >= 0 ? val : 0}` }
}
