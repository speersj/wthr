import React from "react";
import { Text, TextProps } from "rebass";

export default function Temperature(
  props: { value: number; inline?: boolean } & TextProps,
) {
  const css = props.inline ? { display: "inline" } : {};

  return (
    <Text {...props} css={css}>
      {props.value && `${Math.round(props.value)}˚`}
    </Text>
  );
}
