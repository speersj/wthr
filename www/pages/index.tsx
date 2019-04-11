import React from "react";
import { Subscribe } from "unstated";

import PageRoot from "../layout/PageRoot";
import Location from "../components/Location";
import WeatherStatsBar from "../components/WeatherStatsBar";
import CurrentConditions from "../components/CurrentConditions";
import Forecast from "../components/Forecast";
import LocationContainer from "../containers/LocationContainer";
import ForecastContainer from "../containers/ForecastContainer";
import TextBoxCentered from "../components/TextBoxCentered";

export default function Index({ host }: { host: string }) {
  return (
    <PageRoot title="wthr">
      <Subscribe to={[LocationContainer, ForecastContainer]}>
        {(location: LocationContainer, forecast: ForecastContainer) => {
          if (!location.isReady) {
            location.init(host).then(location.loadCurrentLocation);
          }

          if (!forecast.isReady) {
            forecast.init(host).then(() => {
              forecast.load(location.coords).catch((err) => {
                alert(`Error loading forecast: ${err}`);
              });
            });
          }

          if (forecast.isLoaded) {
            return (
              <>
                <Location container={location} />
                <WeatherStatsBar
                  title={location.locationName}
                  {...forecast.currently}
                />

                <CurrentConditions
                  forecastSummary={forecast.daily.summary}
                  conditions={forecast.currently}
                />

                <Forecast data={forecast.dailyData.slice(0, 6)} />
              </>
            );
          } else {
            return <TextBoxCentered>🌈🌈🌈 Loading... 🌈🌈🌈 </TextBoxCentered>;
          }
        }}
      </Subscribe>
    </PageRoot>
  );
}
