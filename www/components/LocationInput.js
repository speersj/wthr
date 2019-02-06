import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { color, space, fontSize } from 'styled-system'
import theme from '../lib/theme'

LocationInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  hasFocus: PropTypes.bool,
  gps: PropTypes.func.isRequired,
}

LocationInput.defaultProps = { hasFocus: false }

const StyledInput = styled.input`
  ${color}
  ${space}
  ${fontSize}
  border-radius: 8px;
  border: none;
  padding-right: 50px;
`

const RightButton = styled.button`
  ${color}
  ${fontSize}
  ${space}
  border: none;
  border-radius: 8px;
  margin-left: -50px;
  width: 50px;

  &:hover {
    cursor: pointer;
    box-shadow: 0 2px 16px ${theme.colors.textEm}
  }
`

const LeftButton = styled.button`
  ${color}
  ${fontSize}
  ${space}
  border: none;
  border-radius: 8px;

  &:hover {
    cursor: pointer;
    box-shadow: 0 2px 16px ${theme.colors.textEm}
  }
`

export default function LocationInput(props) {
  return (
    <>
      <LeftButton
        bg="bg"
        fontSize={[3, 4]}
        py={2}
        mx={4}
        title="Current Location"
        onClick={props.gps}
      >
        🧭
      </LeftButton>

      <StyledInput
        value={props.value}
        onChange={props.onChange}
        color={props.hasFocus ? 'accent' : 'contrast'}
        fontSize={[3, 4]}
        bg={props.hasFocus ? 'bgMuted' : 'bg'}
        py={2}
        pl={2}
        {...props}
        css={{ textAlign: 'center' }}
      />
      <RightButton
        bg={props.hasFocus ? 'bgMuted' : 'bg'}
        fontSize={[3, 4]}
        py={2}
      >
        🔍
      </RightButton>
    </>
  )
}
