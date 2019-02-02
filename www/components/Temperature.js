import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'

Temperature.propTypes = {
  value: PropTypes.number,
  inline: PropTypes.bool,
}

export default function Temperature(props) {
  const css = props.inline && { display: 'inline' }
  return (
    <Text {...props} css={css}>
      {props.value && `${Math.round(props.value)}˚`}
    </Text>
  )
}
