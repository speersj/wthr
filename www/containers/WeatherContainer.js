import { Container } from 'unstated'

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
}
