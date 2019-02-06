import { Container } from 'unstated'
import axios from 'axios'
import { forecastURL } from '../lib/apiURLs'

export default class WeatherContainer extends Container {
  state = {
    currently: {},
    daily: {
      data: [],
    },
  }

  /**
   * init
   * @param {string} host - hostname, ex localhost:3000 / wthr.now.sh
   */
  init = async host => this.setState({ host })

  loadForecast = async (lat, lng) => {
    if (lat != undefined && lng != undefined) {
      try {
        const res = await axios.get(forecastURL(this.state.host, lat, lng))
        this.setState(res.data)
      } catch (err) {
        alert(err)
      }
    }
  }
}
