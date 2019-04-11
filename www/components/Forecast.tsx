import React, { Component } from "react";
import { Box, Flex } from "rebass";
import DailyForecast from "./DailyForecast";
import ForecastThumbnail from "./ForecastThumbnail";
import { ForecastAPIDailyData } from "../lib/ForecastAPIResponse";
import TextBoxCentered from "./TextBoxCentered";

type ComponentProps = { data: ForecastAPIDailyData[] };
type ComponentState = { focusedData?: ForecastAPIDailyData };

class Forecast extends Component<ComponentProps, ComponentState> {
  state: ComponentState = {};

  componentDidUpdate(prevProps: ComponentProps) {
    if (!this.state.focusedData) {
      this.setState({ focusedData: this.props.data[0] });
    }
  }

  render() {
    const { focusedData } = this.state;
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
              active={(focusedData && day.time === focusedData.time) || false}
              key={day.time}
              onClick={() => {
                this.thumbnailClick(day.time);
              }}
            />
          ))}
        </Flex>
        <Box my={3} width={1}>
          {this.isLoaded && (
            <DailyForecast {...focusedData as ForecastAPIDailyData} />
          )}
        </Box>
      </>
    );
  }

  private thumbnailClick = (timeStamp: number) => {
    function finder(data: ForecastAPIDailyData) {
      return data.time === timeStamp;
    }

    this.setState({ focusedData: this.props.data.find(finder) });
  };

  get isLoaded() {
    return this.props.data.length > 0;
  }
}

export default Forecast;
