import axios from "axios";
import { browserCoordinates, ICoords, isCloseEnough } from "../lib/geocoding";
import { Container } from "unstated";
import { reverseGeocodeURL } from "../lib/apiURLs";
import cache from "./cache/locationCache";

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

/** if all else fails! */
const DEFAULT_LOCATION: ILocationState = {
  name: "Portland, Oregon (Default)",
  coords: { lat: 45.5155, lng: -122.6793 } as ICoords,
};

/**
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

  /** set hostname for api requests and loads cached location if available */
  init = (hostName: string) => this.setState({ hostName, ...cache.load() });

  /** ready for API requests? (hack) */
  get isReady() {
    return this.state.hostName.length > 0;
  }

  get coords(): ICoords {
    return { ...this.state.coords };
  }

  get locationName() {
    return this.state.name;
  }

  /** Use in case of emergency (can't figure out location?) */
  loadDefaults() {
    return this.setState({ ...DEFAULT_LOCATION });
  }

  get isDefault() {
    const { name, coords } = this.state;
    return (
      name === DEFAULT_LOCATION.name &&
      coords.lat === DEFAULT_LOCATION.coords.lat &&
      coords.lng === DEFAULT_LOCATION.coords.lng
    );
  }

  /**
   * Loads current location from localStorage / navigator.geolocation.
   * Won't modify state if location is "close enough" to current state
   * unless force = true.
   * Resolves to true if location was changed from its previous state,
   * false if location was not changed.
   */
  loadCurrentLocation = async (force = false) => {
    let browserGeo: ICoords;

    browserGeo = await browserCoordinates({ enableHighAccuracy: true }).catch(
      (err) => {
        throw new Error(`Unable to load location: ${err}`);
      },
    );

    if (!force && isCloseEnough(this.state.coords, browserGeo)) {
      return Promise.resolve(false);
    }

    const name = await this.reverseGeocode(browserGeo).catch(() => "");
    const location = { name, coords: browserGeo };

    cache.save(location);
    await this.setState(location);
    return Promise.resolve(true);
  };

  /** force set location to coords,
   * attempts to look up human readable name if none is supplied */
  setLocation = async (coords: ICoords, locationName = "") => {
    let name = locationName;

    if (locationName.length === 0) {
      name = await this.reverseGeocode(coords).catch(() => "Unknown");
    }

    return this.setState((prevState) => ({ ...prevState, name, coords }));
  };

  /** Attempts to look up human readable name for location given
   * coordinates; sets locationName to a blank string if lookup fails,
   * throws an error if hostName is not set in init() */
  private reverseGeocode = async (coords: ICoords) => {
    if (this.state.hostName.length === 0) {
      throw new Error("Host name not set in LocationContainer!");
    }

    const url = reverseGeocodeURL(this.state.hostName, coords.lat, coords.lng);
    const res = await axios.get(url).catch(() => undefined);

    if (!res) {
      return "";
    }

    const { city, state, county } = res.data.address as IReverseGeocodeResponse;
    return `${city || county}, ${state}`;
  };
}
