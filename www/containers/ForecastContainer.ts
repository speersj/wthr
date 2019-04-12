import axios from "axios";
import { Container } from "unstated";
import { forecastURL } from "../lib/apiURLs";
import {
  ForecastAPIResponse,
  ForecastAPICurrently,
  ForecastAPIMinutely,
  ForecastAPIDaily,
  ForecastAPIDailyData,
} from "../lib/ForecastAPIResponse";
import { ICoords } from "../lib/geocoding";

export interface StateContainerInterface {
  hostName: string;
  isLoaded: boolean;
  forecast?: ForecastAPIResponse;
}

export default class ForecastContainer extends Container<
  StateContainerInterface
> {
  state: StateContainerInterface = {
    hostName: "",
    isLoaded: false,
  };

  /**
   * sets host name and loads previously cached forecast from
   * localStorage if data exists
   */
  init = async (hostName: string) => this.setState({ hostName });

  get isReady() {
    return this.state.hostName.length > 0;
  }

  get isLoaded() {
    return !!(
      this.state.hostName.length > 0 &&
      this.state.forecast &&
      this.state.forecast.currently &&
      this.state.forecast.minutely &&
      this.state.forecast.daily
    );
  }

  get currently(): ForecastAPICurrently {
    if (!this.isLoaded) throw new Error("Forecast data not loaded!");
    return { ...this.state.forecast!.currently };
  }

  get minutely(): ForecastAPIMinutely {
    if (!this.isLoaded) throw new Error("Forecast data not loaded!");
    return { ...this.state.forecast!.minutely };
  }

  get daily(): ForecastAPIDaily {
    if (!this.isLoaded) throw new Error("Forecast data not loaded!");
    return { ...this.state.forecast!.daily };
  }

  /**
   * returns data for current and upcoming days
   */
  get dailyData(): ForecastAPIDailyData[] {
    return (this.isLoaded && [...this.state.forecast!.daily.data]) || [];
  }

  /**
   * loads a forecast for given coordinates
   * throws an error if hostName is not set!
   */
  load = async (coords: ICoords) => {
    if (this.state.hostName.length === 0)
      throw new Error("Host name not set in ForecastContainer!");

    const url = forecastURL(this.state.hostName, coords.lat, coords.lng);

    let response = await axios.get(url).catch((err) => {
      throw new Error(`Could not load forecast: ${err}`);
    });

    const forecast: ForecastAPIResponse = {
      ...(response.data as ForecastAPIResponse),
    };

    if (forecast.flags && forecast.flags["darksky-unavailable"]) {
      throw new Error(
        "API Reports forecast is currently unavailable for this area (darksky-unavailable)",
      );
    }

    return this.setState((prevState) => ({
      ...prevState,
      isLoaded: true,
      forecast,
    }));
  };
}
