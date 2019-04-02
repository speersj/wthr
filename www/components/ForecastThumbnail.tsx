import React, { FC } from "react";
import { Card, Heading } from "rebass";
import styled from "styled-components";

import { toDayOfWeek } from "../lib/dateTime";
import theme from "../lib/theme";
import Temperature from "./Temperature";
import TextBoxCentered from "./TextBoxCentered";
import TextCentered from "./TextCentered";
import WeatherIcon from "./WeatherIcon";

interface Props {
  icon: string;
  temperatureHigh: number;
  temperatureLow: number;
  time: number;
  active: boolean;
  onClick(time: number): void;
}

const HighlightCard = styled(Card)`
  transition: all 0.5s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 32px ${theme.colors.textEm};
  }
`;

const ForecastThumbnail: FC<Props> = (props: Props) => {
  const {
    onClick,
    icon,
    temperatureHigh,
    temperatureLow,
    time,
    active,
  } = props;

  const boxShadow = active ? `0 2px 16px ${theme.colors.textEm}` : "";

  return (
    <HighlightCard
      m={3}
      p={3}
      borderRadius={10}
      fontSize={[1, 2, 3]}
      bg={active ? "bgEm" : "bgMuted"}
      css={{ boxShadow }}
      onClick={() => onClick(time)}
    >
      <Heading fontSize={[2, 3, 5]} py={2} textAlign="center">
        <WeatherIcon name={icon} />
      </Heading>
      <TextBoxCentered>
        <Temperature value={temperatureHigh} color="hot" inline />{" "}
        <Temperature value={temperatureLow} color="cold" inline />
      </TextBoxCentered>

      <TextCentered color={active ? "text" : "textMuted"}>
        {toDayOfWeek(time, true)}
      </TextCentered>
    </HighlightCard>
  );
};

ForecastThumbnail.defaultProps = { active: false };

export default ForecastThumbnail;
