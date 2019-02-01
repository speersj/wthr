import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

ContentLayout.propTypes = { children: PropTypes.node }

const StyledDiv = styled.div`
  padding-bottom: 4rem;
`

export default function ContentLayout({ children }) {
  return <StyledDiv>{children}</StyledDiv>
}
