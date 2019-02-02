import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box } from 'rebass'
import Title from './Title'

/**
 * This component is also responsible for loading
 * location and weather data via the passed in container,
 * which should have a "load" function - see componentDidMount below
 *
 */
export default class Location extends Component {
  static propTypes = {
    container: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
  }

  componentDidMount = () => {
    // load initial location and weather data
    this.props.container.load(this.props.host)
  }

  render() {
    const { location } = this.props.container.state
    return (
      <Box w={1} py={2} bg="bgEm" color="contrast">
        {location ? (
          <Title>{location}</Title>
        ) : (
          <Title data-testid="loading-location">Loading...</Title>
        )}
      </Box>
    )
  }
}
