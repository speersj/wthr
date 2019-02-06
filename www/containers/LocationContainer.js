import { Container } from 'unstated'
import axios from 'axios'
import { reverseGeocodeURL } from '../lib/apiURLs'
import { browserCoordinates } from '../lib/geocoding'

export default class LocationContainer extends Container {
  state = { locationName: '' }

  init = host => this.setState({ host })

  loadFromBrowser = () => {
    browserCoordinates(({ lat, lng }) => {
      if (lat !== this.state.lat || lng !== this.state.lng)
        this.setLocation(lat, lng)
    })
  }

  setLocation = (lat, lng) => {
    this.setState({ lat, lng })
    return this.callReverseGeocodeAPI(lat, lng)
  }

  callReverseGeocodeAPI = async (lat, lng) => {
    const res = await axios.get(reverseGeocodeURL(this.state.host, lat, lng))
    const { city, state, county } = res.data.address
    return this.setState({ locationName: `${city || county}, ${state}` })
  }
}
