import { Container } from 'unstated'
import axios from 'axios'
import { reverseGeocodeURL, forecastURL } from '../lib/apiURLs'
import { browserCoordinates } from '../lib/geocoding'

// disabled for testing TODO
const LOCAL_STORAGE_ENABLED = false

export default class WeatherContainer extends Container {
  state = {
    location: '',
    weather: {
      currently: {},
      daily: {
        data: [],
      },
    },
  }

  /**
   * load initial location from local storage (if enabled & present)
   * or from browser location, then load weather data
   * @param {string} host - host, ex localhost:3000, for making ajax requests
   *
   */
  load = async host => {
    await this.setState({ host })
    const { lat, lng, location } = this.localStorageLoad()

    if (lat && lng && location) {
      this.getForecast({ lat, lng })
      this.setState({ lat, lng, location })
    } else {
      browserCoordinates(this.setLocationFromBrowser)
    }
  }

  // callback for setting location from browser
  setLocationFromBrowser = async ({ lat, lng }) => {
    await this.setState({ lat, lng })
    this.getForecast({ lat, lng })
    await this.reverseGeocode()
    this.localStorageSave()
  }

  // sets this.state.location by calling reverse-geocode api endpoint
  // with this.state.lat & this.state.lng
  reverseGeocode = async () => {
    const { lat, lng } = this.state
    const res = await axios.get(reverseGeocodeURL(this.state.host, lat, lng))
    const { city, state, county } = res.data.address
    return this.setState({ location: `${city || county}, ${state}` })
  }

  /**
   * Loads previously saved values from local storage
   * @returns {object} - { lat, lng, location } or {} if non-existent
   */
  localStorageLoad = () => {
    if (!LOCAL_STORAGE_ENABLED) return {}
    const { lat, lng, location } = localStorage
    return { lat, lng, location }
  }

  /**
   * Saves state (lat, lng, location) to localStorage
   */
  localStorageSave = () => {
    if (!LOCAL_STORAGE_ENABLED) return
    localStorage.lat = this.state.lat
    localStorage.lng = this.state.lng
    localStorage.location = this.state.location
  }

  getForecast = async ({ lat, lng }) => {
    const url = forecastURL(this.state.host, lat, lng)
    try {
      const res = await axios.get(url)
      this.setState({ weather: res.data })
    } catch (err) {
      alert(err)
    }
  }
}
