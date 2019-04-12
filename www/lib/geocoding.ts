import { isBetween } from "./utils";

export interface ICoords {
  lat: number;
  lng: number;
}

export interface IBrowserCoords {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export const DEFAULTS: ICoords = { lat: 45.572222, lng: -122.682624 };

/**
 * converts browser supplied coordinates to internal { lat, lng } type
 */
export function convertBrowserCoordinates(loc: IBrowserCoords): ICoords {
  return { lat: loc.coords.latitude, lng: loc.coords.longitude };
}

/**
 * Read coordinates from browser's geolocation API
 */
export function browserCoordinates(
  options: {
    enableHighAccuracy?: boolean;
    maximumAge?: number;
    timeout?: number;
  } = {},
) {
  return new Promise<ICoords>((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => resolve(convertBrowserCoordinates(position)),
      (error) => reject(error),
      options,
    );
  });
}

const DEFAULT_MAX_OFFSET = 0.01;

/** returns true if lat/lng are within maxOffset of each other */
export function isCloseEnough(
  coordsA: ICoords,
  coordsB: ICoords,
  maxOffset = DEFAULT_MAX_OFFSET,
) {
  const { lat, lng } = coordsB;
  const offset = Math.abs(maxOffset);

  return (
    isBetween(coordsA.lat, lat - offset, lat + offset) &&
    isBetween(coordsA.lng, lng - offset, lng + offset)
  );
}
