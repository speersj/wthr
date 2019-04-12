import React from "react";
import TextBoxCentered from "./TextBoxCentered";
import { BoxProps } from "rebass";

export default function DailyForecastCell(props: BoxProps) {
  return (
    <TextBoxCentered width={1 / 3} fontSize={[3, 4]} my={3} {...props}>
      {props.children}
    </TextBoxCentered>
  );
}
