import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'

TextSmall.propTypes = { children: PropTypes.node }

export default function TextSmall(props) {
  return (
    <Text fontSize={[1, 2]} {...props}>
      {props.children}
    </Text>
  )
}
