import React from 'react'
import PropTypes from 'prop-types'
import { Heading } from 'rebass'

Title.propTypes = { children: PropTypes.node }

export default function Title(props) {
  return (
    <Heading fontSize={[3, 4]} textAlign="center" py={2} {...props}>
      {props.children}
    </Heading>
  )
}
