import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { color, space, fontSize } from 'styled-system'

LocationInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

const StyledInput = styled.input`
  ${color}
  ${space}
  ${fontSize}
  border-radius: 8px;
  border: none;
  &:focus {
    background-color: white;
    color: black;
  }
`

export default function LocationInput(props) {
  return (
    <StyledInput
      value={props.value}
      onChange={props.onChange}
      color="contrast"
      bg="bg"
      fontSize={[3, 4]}
      p={2}
      border
      css={{ textAlign: 'center' }}
    />
  )
}
