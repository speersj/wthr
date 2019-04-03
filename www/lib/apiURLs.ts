const PORTS = {
  forecast: 8010,
  geocode: 8020,
  "reverse-geocode": 8030,
};

/**
 *
 * Returns a /api/forecast URL given a hostname
 */
export function forecastURL(host = "", lat: number, lng: number) {
  const queryParams = `?lat=${lat}&lng=${lng}`;
  return isLocalhost(host)
    ? `http://localhost:${PORTS.forecast}${queryParams}`
    : `https://${host}/api/forecast${queryParams}`;
}

/**
 *
 * Returns a /api/geocode URL given a hostname
 */
export function geocodeURL(host = "", q: string) {
  return encodeURI(
    isLocalhost(host)
      ? `http://localhost:${PORTS.geocode}?q=${encodeURIComponent(q)}`
      : `https://${host}/api/geocode?q=${q}`,
  );
}

/**
 *
 * Returns a /api/reverse-geocode URL given a hostname
 */
export function reverseGeocodeURL(host = "", lat: number, lng: number) {
  const queryParams = `?lat=${lat}&lng=${lng}`;
  return isLocalhost(host)
    ? `http://localhost:${PORTS["reverse-geocode"]}${queryParams}`
    : `https://${host}/api/reverse-geocode${queryParams}`;
}

function isLocalhost(host: string) {
  return host.indexOf("localhost") !== -1;
}
