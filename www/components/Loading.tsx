import React from "react";
import TitleBig from "./TitleBig";

interface Props {
  text?: string;
}

export default function Loading(props: Props) {
  const loadingText = props.text || "Loading...";
  return <TitleBig {...props}>{loadingText}</TitleBig>;
}
