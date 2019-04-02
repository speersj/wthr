import React from "react";
import { Heading, HeadingProps } from "rebass";

export default function TitleBig(props: HeadingProps) {
  return (
    <Heading
      fontSize={[5, 6]}
      textAlign="center"
      py={2}
      color="textEm"
      {...props}
    >
      {props.children}
    </Heading>
  );
}
