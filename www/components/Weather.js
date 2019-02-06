import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Weather extends Component {
  static propTypes = {
    container: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
    children: PropTypes.node,

    lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }

  componentDidMount = () => {
    this.props.container.init(this.props.host)
    this.props.container.loadForecast(this.props.lat, this.props.lng)
  }

  // did we receive new lat/lng props?
  componentDidUpdate = prevProps => {
    const { lat, lng, container } = this.props
    if (lat != prevProps.lat || lng != prevProps.lng)
      container.loadForecast(lat, lng)
  }

  render() {
    return <>{this.props.children}</>
  }
}
