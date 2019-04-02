import { Container } from "unstated";
import axios from "axios";
import { reverseGeocodeURL, forecastURL } from "../lib/apiURLs";
import { browserCoordinates, GeoLocation } from "../lib/geocoding";
import { ForecastAPIResponse } from "../__test__/lib/ForecastAPIResponse";

// not yet implemented
const LOCALSTORAGE_ENABLED = false;

export interface StateContainerInterface {
  host: string;
  location: string;
  lat: number;
  lng: number;
  weather?: ForecastAPIResponse;
}

export default class StateContainer extends Container<StateContainerInterface> {
  public state: StateContainerInterface = {
    host: "",
    lat: 0,
    lng: 0,
    location: "",
    weather: {},
  };

  /**
   * load initial location from local storage (if enabled & present)
   * or from browser location, then load weather data
   *
   */
  public load = async (host: string) => {
    await this.setState({ host });
    const { lat, lng, location } = this.localStorageLoad();

    if (lat && lng && location) {
      this.getForecast({ lat, lng });
      this.setState({ lat, lng, location });
    } else {
      browserCoordinates(this.setLocationFromBrowser);
    }
  };

  // callback for setting location from browser
  public setLocationFromBrowser = async (location: GeoLocation) => {
    await this.setState(location);
    this.getForecast(location);
    await this.reverseGeocode();
    this.localStorageSave();
  };

  // sets this.state.location by calling reverse-geocode api endpoint
  // with this.state.lat & this.state.lng
  public reverseGeocode = async () => {
    const { lat, lng } = this.state;
    const res = await axios.get(reverseGeocodeURL(this.state.host, lat, lng));
    const { city, state, county } = res.data.address;
    return this.setState({ location: `${city || county}, ${state}` });
  };

  /**
   * Loads previously saved values from local storage
   */
  public localStorageLoad = () => {
    if (LOCALSTORAGE_ENABLED) {
      const { lat, lng, location } = localStorage;
      return { lat, lng, location };
    }

    return {};
  };

  /**
   * Saves state (lat, lng, location) to localStorage
   */
  public localStorageSave = () => {
    localStorage.lat = this.state.lat;
    localStorage.lng = this.state.lng;
    localStorage.location = this.state.location;
  };

  public getForecast = async ({ lat, lng }: GeoLocation) => {
    const url = forecastURL(this.state.host, lat, lng);
    try {
      const res = await axios.get(url);
      this.setState({ weather: res.data });
    } catch (err) {
      alert(err);
    }
  };
}
