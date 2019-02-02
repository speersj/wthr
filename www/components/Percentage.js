import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'

Percentage.propTypes = { value: PropTypes.number, inline: PropTypes.bool }
Percentage.defaultProps = { inline: false }

/**
 * Displays a Percentage
 * input value is 0->1, display value is * 100 rounded
 * ex: 0.453 = 45%
 * @param {number} props.value value to display, 0->1
 * @param {bool} props.inline if true display: inline
 */
export default function Percentage(props) {  
  return (
    <Text css={props.inline && { display: 'inline' }} {...props}>
      {Math.round(props.value * 100)}%
    </Text>
  )
}
