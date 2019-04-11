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
