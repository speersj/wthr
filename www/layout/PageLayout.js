import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

PageLayout.propTypes = { children: PropTypes.node }

const StyledDiv = styled.div`
  position: relative;
  min-height: 100vh;
`

export default function PageLayout({ children }) {
  return <StyledDiv>{children}</StyledDiv>
}
