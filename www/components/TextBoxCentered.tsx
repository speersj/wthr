import React from "react";
import { Box, BoxProps } from "rebass";

export default function TextBoxCentered(props: BoxProps) {
  return <Box css={{ textAlign: "center" }} color="text" {...props} />;
}
