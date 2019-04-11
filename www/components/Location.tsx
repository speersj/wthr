import React from "react";
import { Box } from "rebass";

import Title from "./Title";
import LocationContainer from "../containers/LocationContainer";

interface Props {
  container: LocationContainer;
}

export default function Location(props: Props) {
  return (
    <Box py={2} bg="bgEm" color="contrast">
      {location ? (
        <Title>{props.container.locationName}</Title>
      ) : (
        <Title data-testid="loading-location">Loading...</Title>
      )}
    </Box>
  );
}
