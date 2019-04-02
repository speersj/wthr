import React from "react";
import { Heading, Text } from "rebass";
import Temperature from "./Temperature";
import TextBoxCentered from "./TextBoxCentered";
import WeatherIcon from "./WeatherIcon";

interface Props {
  forecastSummary: string;
  conditions: {
    summary: string;
    icon: string;
    temperature: number;
    apparentTemperature: number;
  };
}

const CurrentConditions: React.FC<Props> = (props) => {
  const isLoaded = props.forecastSummary && props.forecastSummary.length > 0;
  const { conditions } = props;
  return (
    <TextBoxCentered py={4} width={1} mx="auto">
      <Heading py={3} fontSize={[5, 6]} color={conditions && conditions.icon}>
        {isLoaded ? <WeatherIcon name={conditions.icon} /> : "🌈"}
        <span data-testid="test-temp">
          {" "}
          {isLoaded && (
            <Temperature
              value={conditions.temperature}
              color={conditions.icon || "textEm"}
            />
          )}
        </span>
      </Heading>
      <Text py={3} fontSize={[2, 3]} color="accent2">
        {isLoaded && `${conditions.summary}, feels like `}{" "}
        {isLoaded && (
          <Temperature value={conditions.apparentTemperature} inline />
        )}
      </Text>
      <Text fontSize={[3, 4]} color="accent">
        {props.forecastSummary}
      </Text>
    </TextBoxCentered>
  );
};

export default CurrentConditions;
