import React from 'react'
import styled from 'styled-components'
import { Link } from 'rebass'

const StyledLink = styled(Link)`
  text-decoration: none;

  :hover {
    color: black;
    background-color: yellow;
  }
`

export default function DarkSkyLink(props) {
  return (
    <StyledLink
      {...props}
      href="https://darksky.net/poweredby/"
      m={1}
      p={2}
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by Dark Sky
    </StyledLink>
  )
}
