import React from "react";
import { Text, TextProps } from "rebass";

export default function TextCentered(props: TextProps) {
  return <Text textAlign="center" color="text" {...props} />;
}
