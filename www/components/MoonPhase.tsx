import React from "react";

import { capitalize } from "../lib/utils";

/**
 * returns name of icon for given moon phase (0 to 1)
 */
export default function MoonPhaseIcon({ moonPhase }: { moonPhase: number }) {
  const title = moonPhaseName(moonPhase) + " Moon";
  return (
    <i title={title} role="img" className={moonPhaseClassName(moonPhase)} />
  );
}

/**
 * given moonPhase value from darkSky API, returns name of that
 * phase "Waxing Crescent", "Full", etc.
 */
export function moonPhaseName(moonPhase: number) {
  return moonPhaseClassName(moonPhase)
    .replace("wi wi-moon-", "")
    .replace(/-\d/, "")
    .split("-")
    .map(capitalize)
    .join(" ");
}

/**
 * returns class name for i element given a moonPhase from darksky api
 */
export function moonPhaseClassName(moonPhase: number) {
  return (
    "wi " +
    [
      "wi-moon-new",
      "wi-moon-waxing-crescent-1",
      "wi-moon-waxing-crescent-2",
      "wi-moon-waxing-crescent-3",
      "wi-moon-waxing-crescent-4",
      "wi-moon-waxing-crescent-5",
      "wi-moon-waxing-crescent-6",

      "wi-moon-first-quarter",
      "wi-moon-waxing-gibbous-1",
      "wi-moon-waxing-gibbous-2",
      "wi-moon-waxing-gibbous-3",
      "wi-moon-waxing-gibbous-4",
      "wi-moon-waxing-gibbous-5",
      "wi-moon-waxing-gibbous-6",

      "wi-moon-full",
      "wi-moon-waning-gibbous-1",
      "wi-moon-waning-gibbous-2",
      "wi-moon-waning-gibbous-3",
      "wi-moon-waning-gibbous-4",
      "wi-moon-waning-gibbous-5",
      "wi-moon-waning-gibbous-6",

      "wi-moon-third-quarter",
      "wi-moon-waning-crescent-1",
      "wi-moon-waning-crescent-2",
      "wi-moon-waning-crescent-3",
      "wi-moon-waning-crescent-4",
      "wi-moon-waning-crescent-5",
      "wi-moon-waning-crescent-6",
    ][Math.floor(moonPhase * 28)]
  );
}
