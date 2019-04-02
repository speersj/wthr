import React, { FunctionComponent, ReactNode } from "react";
import TextBoxCentered from "./TextBoxCentered";

interface T {
  width: number;
  color?: string;
  children: ReactNode;
}

const DailyForecastCell: FunctionComponent<T> = (props: T) => (
  <TextBoxCentered width={1 / 3} fontSize={[3, 4]} {...props} my={3}>
    {props.children}
  </TextBoxCentered>
);

export default DailyForecastCell;
