import React from "react";
import { Text } from "rebass";
import { between } from "../lib/utils";

export default function UVIndex(props: { uvIndex: number }) {
  const { uvIndex } = props;
  return <Text {...uvColor(uvIndex)}>UV {uvIndex}</Text>;
}

/**
 * returns the color to display the UV Index value in
 * according to the UV Index Scale
 * https://www.epa.gov/sunsafety/uv-index-scale-1
 */
export function uvColor(uv: number) {
  return { color: `uvColor${between(uv, 0, 12)}` };
}
