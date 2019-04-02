import React, { Component } from "react";
import { Box } from "rebass";

import StateContainer from "../containers/StateContainer";
import Title from "./Title";

interface Props {
  container: StateContainer;
  // {
  //   location: string;
  //   state: StateContainerInterface;
  //   load(host: string): void;
  // };
  host: string;
}

/**
 * This component is also responsible for loading
 * location and weather data via the passed in container,
 * which should have a "load" function - see componentDidMount below
 */
class Location extends Component<Props> {
  public componentDidMount() {
    // load initial location and weather data
    this.props.container.load(this.props.host);
  }

  public render() {
    const { location } = this.props.container.state;
    return (
      <Box py={2} bg="bgEm" color="contrast">
        {location ? (
          <Title>{location}</Title>
        ) : (
          <Title data-testid="loading-location">Loading...</Title>
        )}
      </Box>
    );
  }
}

export default Location;
