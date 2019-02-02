import React from 'react'
import PropTypes from 'prop-types'
import { Heading } from 'rebass'

TitleBig.propTypes = { children: PropTypes.node }

export default function TitleBig(props) {
  return (
    <Heading
      fontSize={[5, 6]}
      textAlign="center"
      py={2}
      color="textEm"
      {...props}
    >
      {props.children}
    </Heading>
  )
}
