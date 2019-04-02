import React from "react";
import { Text } from "rebass";

Percentage.defaultProps = { inline: false };

/**
 * Displays a Percentage
 * input value is 0->1, display value is * 100 rounded
 * ex: 0.453 = 45%
 * displays inline if props.inline = true
 */
export default function Percentage(props: { value: number; inline: boolean }) {
  const css = props.inline ? { display: "inline" } : {};
  return (
    <Text css={css} {...props}>
      {Math.round(props.value * 100)}%
    </Text>
  );
}
