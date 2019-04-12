import React from "react";
import { Text, TextProps } from "rebass";

interface Props extends TextProps {
  value: number;
  inline?: boolean;
}

/**
 * Displays a Percentage
 * input value is 0->1, display value is * 100 rounded
 * ex: 0.453 = 45%
 * displays inline if props.inline = true
 */
export default function Percentage(props: Props) {
  const css = props.inline ? { display: "inline" } : {};

  return (
    <Text css={css} {...props}>
      {Math.round(props.value * 100)}%
    </Text>
  );
}
