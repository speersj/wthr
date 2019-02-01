import React from 'react'
import { Box, Heading } from 'rebass'

import PageRoot from '../layout/PageRoot'

export default function Index() {
  return (
    <PageRoot title="wthr">
      <Box width={1} p={4}>
        <Heading>Hello World</Heading>
      </Box>
    </PageRoot>
  )
}
