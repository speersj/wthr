import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Title from './Title'
import TextBoxCentered from './TextBoxCentered'
import LocationInput from './LocationInput'

export default class Location extends Component {
  static propTypes = {
    container: PropTypes.object.isRequired,
    host: PropTypes.string.isRequired,
  }

  state = {
    input: '',
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.input) {
      const { locationName } = nextProps.container.state
      if (locationName && locationName.length > 0)
        return { input: locationName }
    }

    return prevState
  }

  componentDidMount = async () => {
    // load initial location data
    await this.props.container.init(this.props.host)
    this.props.container.loadFromBrowser()
  }

  onInput = e => {
    this.setState({ input: e.target.value })
  }

  render() {
    const { locationName } = this.props.container.state
    return (
      <TextBoxCentered w={1} py={2} bg="bgEm" color="contrast">
        {locationName ? (
          <LocationInput onChange={this.onInput} value={this.state.input} />
        ) : (
          <Title data-testid="loading-location">Loading...</Title>
        )}
      </TextBoxCentered>
    )
  }
}
