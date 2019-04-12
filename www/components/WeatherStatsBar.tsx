import React from "react";
import { Box, Flex } from "rebass";

import Percentage from "./Percentage";
import RotatedSpan from "./RotatedSpan";
import Temperature from "./Temperature";
import TextBoxCentered from "./TextBoxCentered";
import TextSmall from "./TextSmall";
import UVIndex from "./UVIndex";
import { ForecastAPICurrently } from "../lib/ForecastAPIResponse";

export default function WeatherStatsBar(props: ForecastAPICurrently) {
  const { windSpeed, windBearing, humidity, dewPoint, uvIndex } = props;

  return (
    <Box width={1} bg="bgEm" fontSize={[1, 2]} color="text" p={3}>
      <Flex alignItems="center" justifyContent="space-evenly">
        <TextBoxCentered width={1 / 4}>
          <TextSmall>Winds</TextSmall>
          <RotatedSpan angle={windBearing || 0}>️️️️️ ⬆ ️</RotatedSpan>
          {Math.round(windSpeed)}mph
        </TextBoxCentered>

        <TextBoxCentered width={1 / 4}>
          Humidity {<Percentage value={humidity} />}
        </TextBoxCentered>

        <TextBoxCentered width={1 / 4}>
          Dew Pt {<Temperature value={dewPoint} />}
        </TextBoxCentered>

        <TextBoxCentered width={1 / 4}>
          <UVIndex uvIndex={uvIndex} />
        </TextBoxCentered>
      </Flex>
    </Box>
  );
}
