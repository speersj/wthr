import React from "react";
import { Subscribe } from "unstated";

import PageRoot from "../layout/PageRoot";
import StateContainer from "../containers/StateContainer";
import Location from "../components/Location";
import WeatherStatsBar from "../components/WeatherStatsBar";
import CurrentConditions from "../components/CurrentConditions";
import Forecast from "../components/Forecast";

export default function Index(props: { host: string }) {
  return (
    <PageRoot title="wthr">
      <Subscribe to={[StateContainer]}>
        {(container) => {
          const { weather } = container.state;
          const summary = (weather.daily && weather.daily.summary) || "";
          const dailyData = (weather.daily && weather.daily.data) || [];
          return (
            <>
              <Location container={container as StateContainer} {...props} />
              <WeatherStatsBar
                title={container.state.location}
                {...container.state.weather.currently}
              />

              <CurrentConditions
                conditions={container.state.weather.currently}
                forecastSummary={summary}
              />

              <Forecast data={dailyData.slice(0, 6)} />
            </>
          );
        }}
      </Subscribe>
    </PageRoot>
  );
}
