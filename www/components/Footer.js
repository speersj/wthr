import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'rebass'

Footer.propTypes = { children: PropTypes.node }

export default function Footer({ children }) {
  return (
    <Box
      width={1}
      css={{
        textAlign: 'center',
        padding: '1rem',
        position: 'absolute',
        bottom: 0,
        height: '4rem',
      }}
    >
      {children}
    </Box>
  )
}
