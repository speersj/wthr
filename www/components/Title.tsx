import React from "react";
import { Heading, HeadingProps } from "rebass";

export default function Title(props: HeadingProps) {
  return (
    <Heading fontSize={[3, 4]} textAlign="center" py={2} {...props}>
      {props.children}
    </Heading>
  );
}
