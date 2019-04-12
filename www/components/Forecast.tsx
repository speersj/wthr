import React, { Component } from "react";
import { Box, Flex } from "rebass";
import DailyForecast from "./DailyForecast";
import ForecastThumbnail from "./ForecastThumbnail";
import { ForecastAPIDailyData } from "../lib/ForecastAPIResponse";

type Props = { data: ForecastAPIDailyData[] };
type State = { focusedData?: ForecastAPIDailyData };

class Forecast extends Component<Props, State> {
  state: State = {};

  componentDidMount() {
    if (!this.state.focusedData && this.props.data.length > 0) {
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
          bg="bg"
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
        <Box py={3} width={1} bg="bg">
          {focusedData && (
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
}

export default Forecast;
