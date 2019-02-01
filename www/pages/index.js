import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading } from 'rebass'

import PageRoot from '../layout/PageRoot'

Index.propTypes = { host: PropTypes.string.isRequired }

export default function Index() {
  return (
    <PageRoot title="wthr">
      <Box width={1} p={4}>
        <Heading>Hello World</Heading>
      </Box>
    </PageRoot>
  )
}
