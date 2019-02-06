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

  state = { input: '' }

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
    const { init, loadFromBrowser } = this.props.container
    await init(this.props.host)
    loadFromBrowser()
  }

  onInput = e => this.setState({ input: e.target.value })
  onBlur = () => this.setState({ hasFocus: false })
  browserLocation = () => this.props.container.loadFromBrowser()

  onFocus = e => {
    e.target.select()
    this.setState({ hasFocus: true })
  }

  render() {
    const { locationName } = this.props.container.state
    return (
      <TextBoxCentered w={1} py={2} bg="bgEm" color="contrast">
        {locationName ? (
          <LocationInput
            onChange={this.onInput}
            value={this.state.input}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            hasFocus={this.state.hasFocus}
            gps={this.browserLocation}
          />
        ) : (
          <Title data-testid="loading-location">Loading...</Title>
        )}
      </TextBoxCentered>
    )
  }
}
