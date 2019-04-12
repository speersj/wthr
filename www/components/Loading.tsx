import React from "react";
import TitleBig from "./TitleBig";
import { HeadingProps } from "rebass";

interface Props extends HeadingProps {
  text?: string;
}

export default function Loading(props: Props) {
  const loadingText = props.text || "Loading...";
  return (
    <TitleBig color="accent" {...props}>
      {loadingText}
    </TitleBig>
  );
}
