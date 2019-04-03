import React, { Component } from "react";
import { Box, Flex } from "rebass";
import DailyForecast from "./DailyForecast";
import ForecastThumbnail from "./ForecastThumbnail";

// all directions set true north at 0° and progress clockwise
// all percentages range from 0 to 1
// dates / times are unix time in seconds
interface Data {
  time: number;
  summary: string;
  icon: string;
  sunriseTime: number;
  sunsetTime: number;
  moonPhase: number;
  precipIntensity: number; // inches / hour, * 24 for daily
  precipProbability: number; // percentage
  precipType: string; // rain / snow etc
  temperatureHigh: number; // degrees fahrenheit
  temperatureLow: number; // degree fahrenheit
  dewPoint: number; // deg f
  humidity: number; // percentage
  pressure: number; // millibars
  windSpeed: number; // mph
  windBearing: number; // direction 0->360
  cloudCover: number; // percentage
  uvIndex: number;
  visibility: number; // up to 10 miles
}

interface ComponentProps {
  data: Data[];
}

interface ComponentState {
  focusedData: Data;
}

class Forecast extends Component<ComponentProps, ComponentState> {
  readonly state: ComponentState = { focusedData: emptyData() };

  componentDidUpdate(prevProps: ComponentProps) {
    if (prevProps.data.length === 0 && this.props.data.length > 0) {
      this.setState({ focusedData: this.props.data[0] });
    }
  }

  render() {
    return (
      <>
        <Flex
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          {this.props.data.map((day) => (
            <ForecastThumbnail
              {...day}
              active={day.time === this.state.focusedData.time}
              key={day.time}
              onClick={() => {
                this.thumbnailClick(day.time);
              }}
            />
          ))}
        </Flex>
        <Box my={3} width={1}>
          {this.isLoaded() && <DailyForecast {...this.state.focusedData} />}
        </Box>
      </>
    );
  }

  private thumbnailClick(timeStamp: number) {
    const focusedData =
      (this.props.data || []).find((day) => day.time === timeStamp) ||
      emptyData();
    this.setState({ focusedData });
  }

  private isLoaded() {
    return this.props.data.length > 0 && this.props.data[0].time !== 0;
  }
}

function emptyData(): Data {
  return {
    cloudCover: 0,
    dewPoint: 0,
    humidity: 0,
    icon: "",
    moonPhase: 0,
    precipIntensity: 0,
    precipProbability: 0,
    precipType: "",
    pressure: 0,
    summary: "",
    sunriseTime: 0,
    sunsetTime: 0,
    temperatureHigh: 0,
    temperatureLow: 0,
    time: 0,
    uvIndex: 0,
    visibility: 0,
    windBearing: 0,
    windSpeed: 0,
  };
}

export default Forecast;
