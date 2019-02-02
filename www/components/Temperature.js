import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'

Temperature.propTypes = {
  temp: PropTypes.number,
  inline: PropTypes.bool,
}

export default function Temperature(props) {
  const css = props.inline && { display: 'inline' }
  return (
    <Text {...props} css={css}>
      {props.temp && `${Math.round(props.temp)}˚`}
    </Text>
  )
}
