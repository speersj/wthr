import React from "react";
import { Heading, Text } from "rebass";
import Temperature from "./Temperature";
import TextBoxCentered from "./TextBoxCentered";
import WeatherIcon from "./WeatherIcon";
import { ForecastAPICurrently } from "../lib/ForecastAPIResponse";

interface Props {
  forecastSummary: string;
  conditions: ForecastAPICurrently;
}

const CurrentConditions = (props: Props) => {
  const { conditions } = props;
  return (
    <TextBoxCentered px={3} py={4} width={1} mx="auto" bg="bg">
      <Heading py={3} fontSize={[5, 6]} color={conditions && conditions.icon}>
        <WeatherIcon name={conditions.icon} />
        <span data-testid="test-temp">
          {" "}
          <Temperature
            value={conditions.temperature}
            color={conditions.icon || "textEm"}
          />
        </span>
      </Heading>
      <Text py={3} fontSize={[2, 3]} color="accent2">
        {`${conditions.summary}, feels like `}{" "}
        <Temperature value={conditions.apparentTemperature} inline />
      </Text>
      <Text fontSize={[3, 4]} color="accent">
        {props.forecastSummary}
      </Text>
    </TextBoxCentered>
  );
};

export default CurrentConditions;
