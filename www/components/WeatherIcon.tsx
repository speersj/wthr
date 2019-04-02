import React from "react";
import theme from "../lib/theme";

export default function WeatherIcon({ name }: { name: string }) {
  return (
    <i
      title={name}
      role="img"
      style={{ color: theme.colors[name] || theme.colors.text }}
      className={iconClassName(name)}
    />
  );
}

function iconClassName(iconName: string) {
  return `wi wi-forecast-io-${iconName}`;
}
