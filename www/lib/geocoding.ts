export interface GPSCoordinates {
  lat: number;
  lng: number;
}

export interface BrowserCoordinates {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export const DEFAULTS: GPSCoordinates = { lat: 45.572222, lng: -122.682624 };

/**
 * converts browser supplied coordinates to internal { lat, lng } type
 */
export function convertBrowserCoordinates(loc: BrowserCoordinates) {
  return { lat: loc.coords.latitude, lng: loc.coords.longitude };
}

/**
 * Read coordinates from browser's navigator.geolocation
 */
export function browserCoordinates(
  cb: (x: GPSCoordinates) => void,
  defaults = DEFAULTS,
) {
  const failFunc = () => cb(defaults);
  const successFunc = (loc: BrowserCoordinates) =>
    cb(convertBrowserCoordinates(loc));

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunc, failFunc);
  } else {
    failFunc();
  }
}
