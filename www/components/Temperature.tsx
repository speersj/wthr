import React from "react";
import { Text, TextProps } from "rebass";

interface Props extends TextProps {
  value: number;
  inline: boolean;
}

Temperature.defaultProps = { inline: false };

export default function Temperature(props: Props) {
  const css = props.inline ? { display: "inline" } : {};

  return (
    <Text {...props} css={css}>
      {props.value && `${Math.round(props.value)}˚`}
    </Text>
  );
}
