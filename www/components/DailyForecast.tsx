import React from "react";
import { Box, Flex, Text } from "rebass";
import { toDate, toDayOfWeek, toTime } from "../lib/dateTime";
import { capitalize } from "../lib/utils";
import Cell from "./DailyForecastCell";
import Icon from "./Icon";
import MoonPhaseIcon, { moonPhaseName } from "./MoonPhase";
import Percentage from "./Percentage";
import RotatedSpan from "./RotatedSpan";
import Temperature from "./Temperature";
import TextBoxCentered from "./TextBoxCentered";
import TextCentered from "./TextCentered";
import TextSmall from "./TextSmall";
import Title from "./Title";
import TitleBig from "./TitleBig";
import UVIndex from "./UVIndex";
import WeatherIcon from "./WeatherIcon";

export interface Props {
  time: number; // unix time
  summary: string;
  icon: string;

  temperatureLow: number;
  temperatureHigh: number;

  sunriseTime: number; // unix time
  sunsetTime: number; // unix time
  moonPhase: number;

  precipProbability: number; // percentage
  precipIntensity: number; // inches / hour
  precipType: string; // rain / snow etc

  windSpeed: number; // mph
  windBearing: number; // direction 0->360
  cloudCover: number; // percentage

  dewPoint: number; // deg f
  humidity: number; // percentage
  pressure: number; // millibars

  uvIndex: number;
  visibility: number; // up to 10 miles
}

const DailyForecast = (props: Props) => {
  const { time } = props;

  if (!time && time !== 0) {
    return (
      <Box width={1} bg="bgEm">
        <TitleBig>🌈</TitleBig>
      </Box>
    );
  }

  return (
    <Box width={1} bg="bgEm">
      <Title color="text">{`${toDayOfWeek(time)}, ${toDate(time)}`}</Title>
      <TitleBig>
        <WeatherIcon name={props.icon} />
      </TitleBig>

      <TextBoxCentered p={2} mb={4} fontSize={[2, 3]}>
        <Temperature value={props.temperatureHigh} color="hot" inline />{" "}
        <Temperature value={props.temperatureLow} color="cold" inline />
        <TextCentered fontSize={[2, 3]} my={2} color="accent2">
          {props.summary}
        </TextCentered>
        {props.precipProbability === 0 ? (
          <Text mt={2}>No Precipitation</Text>
        ) : (
          <>
            <Text mt={2} color="rainy">
              <Percentage value={props.precipProbability} inline /> Chance of{" "}
              {capitalize(props.precipType || "Precipitation")},{" "}
              {(props.precipIntensity * 24).toFixed(2)} in
            </Text>
          </>
        )}
        <Text color="cloudy" mt={2}>
          <Percentage value={props.cloudCover} inline /> Cloudy
        </Text>
      </TextBoxCentered>

      <Flex flexWrap="wrap" justifyContent="space-evenly" alignItems="center">
        <Cell width={1 / 3} color="orange">
          <Icon name="sunrise" />
          <TextSmall>{toTime(props.sunriseTime)}</TextSmall>
        </Cell>

        <Cell width={1 / 3} color="textMuted">
          <Icon name="sunset" />
          <TextSmall>{toTime(props.sunsetTime)}</TextSmall>
        </Cell>

        <Cell width={1 / 3} color="contrast">
          <span data-testid="moon-phase-icon">
            <MoonPhaseIcon moonPhase={props.moonPhase} />
          </span>
          <TextSmall>{moonPhaseName(props.moonPhase)}</TextSmall>
        </Cell>

        <Cell width={1 / 3}>
          <TextSmall>Wind</TextSmall>
          <TextSmall>
            {Math.round(props.windSpeed)}mph
            <RotatedSpan angle={props.windBearing || 0}> ⬆ ️</RotatedSpan>
          </TextSmall>
        </Cell>

        <Cell width={1 / 3}>
          <TextSmall>
            Dew Point
            <Temperature value={props.dewPoint} />
          </TextSmall>
        </Cell>

        <Cell width={1 / 3}>
          <TextSmall>Humidity</TextSmall>
          <TextSmall>
            <Percentage value={props.humidity} />
          </TextSmall>
        </Cell>

        <Cell width={1 / 3}>
          <TextSmall>Pressure</TextSmall>
          <TextSmall>{Math.round(props.pressure)}mb</TextSmall>
        </Cell>

        <Cell width={1 / 3}>
          <TextSmall>Visibility</TextSmall>

          <TextSmall>{renderVisibility(props.visibility)}</TextSmall>
        </Cell>

        <Cell width={1 / 3}>
          <TextSmall>
            <UVIndex uvIndex={props.uvIndex} />
          </TextSmall>
        </Cell>
      </Flex>
    </Box>
  );
};

function renderVisibility(visibility: number) {
  const vis = Math.round(visibility);
  return vis >= 10 ? "> 10 miles" : `${vis} miles`;
}

export default DailyForecast;
