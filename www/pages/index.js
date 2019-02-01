import React from 'react'
import PropTypes from 'prop-types'
import { Box, Heading } from 'rebass'
import { Subscribe } from 'unstated'

import PageRoot from '../layout/PageRoot'
import WeatherContainer from '../containers/WeatherContainer'

Index.propTypes = { host: PropTypes.string.isRequired }

export default function Index() {
  return (
    <PageRoot title="wthr">
      <Subscribe to={[WeatherContainer]}>
        {container => (
          <Box width={1} bg="bgEm">
            <Heading color="textEm">Hello World</Heading>
          </Box>
        )}
      </Subscribe>
    </PageRoot>
  )
}
