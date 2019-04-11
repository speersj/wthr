import axios from "axios";
import { browserCoordinates, ICoords } from "../lib/geocoding";
import { isBetween } from "../lib/utils";
import { Container } from "unstated";
import { reverseGeocodeURL } from "../lib/apiURLs";

type HostName = { hostName: string };

export interface ILocationState {
  name: string;
  coords: ICoords;
}

interface IReverseGeocodeResponse {
  city?: string;
  state?: string;
  county?: string;
}

/**
 * Value for determing whether to do a reverse-geocode lookup
 * if lat/lng are with +/- this amount, use cached location name
 */
const CLOSE_ENOUGH = 0.01;

/** if all else fails! */
const DEFAULT_LOCATION: ILocationState = {
  name: "",
  coords: { lat: 45.5155, lng: -122.6793 } as ICoords,
};

/**
 * returns defaults to be used if localStorage
 * cache & browser geolocation are not available
 * exported for testing purposes
 */
export function getDefaults(): ILocationState {
  return { ...DEFAULT_LOCATION };
}

/**
 * Stores information about current location
 * Be sure to call init(hostname) to set the hostname before
 * calling anything that might hit the api
 */
export default class LocationContainer extends Container<
  ILocationState & HostName
> {
  state: ILocationState & HostName = { ...DEFAULT_LOCATION, hostName: "" };

  /** set the hostname to be used for api requests */
  init = (hostName: string) => this.setState({ hostName });

  get isReady() {
    return this.state.hostName.length > 0;
  }

  get coords(): ICoords {
    return { ...this.state.coords };
  }

  get locationName() {
    const { name } = this.state;
    return name.length > 0 ? name : "???";
  }

  /**
   * Loads current location from localStorage / navigator.geolocation.
   *
   * If cached location data exists and it's "close enough" to browser's
   * geolocation, use that.
   *
   * If no cached location data exists, compare defaults to browser's geolocation.
   * If no cached location data exists & browser geolocation fails, use defaults.
   *
   */
  loadCurrentLocation = async () => {
    let location: ILocationState;
    let cached = this.loadCachedOrDefaults();

    let browserGeo: ICoords;

    browserGeo = await browserCoordinates({ enableHighAccuracy: true }).catch(
      () => ({ ...cached.coords }),
    );

    if (this.isCloseEnough(cached.coords, browserGeo)) {
      location = { ...cached };
    } else {
      const name = await this.reverseGeocode(browserGeo).catch(() => "");
      location = { name, coords: browserGeo };
    }

    return this.setState((prevState) => ({ ...prevState, ...location })).then(
      () => {
        const { name, coords } = this.state;
        this.cacheLocation({ name, coords });
      },
    );
  };

  /**
   * sets coordinates and attempts to look up / reverse-geocode name of location
   */
  loadCoords = async (coords: ICoords) => {
    const name = await this.reverseGeocode(coords).catch(() => "");
    return this.setState((prevState) => ({ ...prevState, name, coords }));
  };

  private reverseGeocode = async (coords: ICoords) => {
    if (this.state.hostName.length === 0) {
      throw new Error("Host name not set in LocationContainer!");
    }

    const url = reverseGeocodeURL(this.state.hostName, coords.lat, coords.lng);
    const res = await axios.get(url);
    const { city, state, county } = res.data.address as IReverseGeocodeResponse;

    return `${city || county}, ${state}`;
  };

  private isCloseEnough = (coordsA: ICoords, coordsB: ICoords) => {
    const { lat, lng } = coordsB;

    return (
      isBetween(coordsA.lat, lat - CLOSE_ENOUGH, lat + CLOSE_ENOUGH) &&
      isBetween(coordsA.lng, lng - CLOSE_ENOUGH, lng + CLOSE_ENOUGH)
    );
  };

  private isCached = () => {
    const location = window.localStorage.getItem("location");
    if (!location) return false;

    const cached = JSON.parse(location);

    return (
      "name" in cached &&
      "coords" in cached &&
      "lat" in cached.coords &&
      "lng" in cached.coords
    );
  };

  private loadCachedOrDefaults = (): ILocationState => {
    if (this.isCached()) {
      const location = window.localStorage.getItem("location");

      if (location) {
        const parsed = JSON.parse(location);
        // ensure cache is valid as it's gone through some changes
        if (
          parsed &&
          "name" in parsed &&
          "coords" in parsed &&
          "lat" in parsed.coords &&
          "lng" in parsed.coords
        ) {
          return parsed;
        } else {
          window.localStorage.clear();
        }
      }
    }

    return { ...DEFAULT_LOCATION };
  };

  private cacheLocation = (location: ILocationState) => {
    window.localStorage.setItem("location", JSON.stringify(location));
  };
}
