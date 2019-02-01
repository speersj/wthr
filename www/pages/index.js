import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'rebass'

import PageRoot from '../layout/PageRoot'

Index.propTypes = { host: PropTypes.string.isRequired }

export default function Index(props) {
  return (
    <PageRoot title="wthr">
      <Box width={1} color="white">
        <h1>Hello World</h1>
      </Box>
    </PageRoot>
  )
}
