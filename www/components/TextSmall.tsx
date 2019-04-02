import React from "react";
import { Text, TextProps } from "rebass";

export default function TextSmall(props: TextProps) {
  return (
    <Text fontSize={[1, 2]} {...props}>
      {props.children}
    </Text>
  );
}
