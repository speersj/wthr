import React from "react";
import { Subscribe } from "unstated";

import PageRoot from "../layout/PageRoot";
import Location from "../components/Location";
import WeatherStatsBar from "../components/WeatherStatsBar";
import CurrentConditions from "../components/CurrentConditions";
import Forecast from "../components/Forecast";
import LocationContainer from "../containers/LocationContainer";
import ForecastContainer from "../containers/ForecastContainer";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import DarkSkyLink from "../components/DarkskyLink";
import SplashScreen from "../layout/SplashScreen";
import { ICoords } from "../lib/geocoding";

export default function Index({ host }: { host: string }) {
  return (
    <PageRoot title="wthr">
      <Subscribe to={[LocationContainer, ForecastContainer]}>
        {(location: LocationContainer, forecast: ForecastContainer) => {
          loadForecast(host, location, forecast);

          if (forecast.isLoaded) {
            return (
              <>
                <Location container={location} />

                <WeatherStatsBar {...forecast.currently} />

                <CurrentConditions
                  forecastSummary={forecast.daily.summary}
                  conditions={forecast.currently}
                />

                <Forecast data={forecast.dailyData.slice(0, 6)} />

                <Footer>
                  <DarkSkyLink />
                </Footer>
              </>
            );
          } else {
            return (
              <SplashScreen>
                <Loading text="🌈 Loading wthr... 🌈" />;
              </SplashScreen>
            );
          }
        }}
      </Subscribe>
    </PageRoot>
  );
}

async function loadForecast(
  hostname: string,
  location: LocationContainer,
  forecast: ForecastContainer,
) {
  if (!forecast.isReady) {
    // set hostname for forecast and location
    await forecast.init(hostname);

    if (!location.isReady) {
      await location.init(hostname);

      // if previous location was cached, load forecast for that
      if (!location.isDefault) {
        await forecast
          .load(location.coords)
          .catch((err) => alert(`Error loading forecast: ${err}`));
      }

      // load current location
      let loadResult = await location.loadCurrentLocation().catch(() => true);

      // only load forecast if browser reports a location
      // other than what was in our cache, or if we are stuck with default
      if (loadResult) {
        forecast
          .load(location.coords)
          .catch((err) => alert(`Error loading forecast: ${err}`));
      }
    }
  }
}
