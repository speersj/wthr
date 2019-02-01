const PORTS = {
  forecast: 8010,
  geocode: 8020,
  'reverse-geocode': 8030,
}

/**
 *
 * Returns a /api/forecast URL given a hostname
 * @param {string} [host] - hostname, ignored for localhost
 * @param {number} [lat] - latitude to look up
 * @param {number} [lng] - longitude to look up
 * @returns {string} URL to api endpoint
 */
export function forecastURL(host = '', lat, lng) {
  const queryParams = `?lat=${lat}&lng=${lng}`
  return isLocalhost(host)
    ? `http://localhost:${PORTS.forecast}${queryParams}`
    : `https://${host}/api/forecast${queryParams}`
}

/**
 *
 * Returns a /api/geocode URL given a hostname
 * @param {string} [host] - hostname, ignored for localhost
 * @param {string} [q] - query term, usually a city/state
 * @returns {string} URL to api endpoint
 */
export function geocodeURL(host = '', q) {
  return encodeURI(
    isLocalhost(host)
      ? `http://localhost:${PORTS.geocode}?q=${encodeURIComponent(q)}`
      : `https://${host}/api/geocode?q=${q}`,
  )
}

/**
 *
 * Returns a /api/reverse-geocode URL given a hostname
 * @param {string} [host] - hostname, ignored for localhost
 * @param {number} [lat] - latitude to look up
 * @param {number} [lng] - longitude to look up
 * @returns {string} URL to api endpoint
 */
export function reverseGeocodeURL(host = '', lat, lng) {
  const queryParams = `?lat=${lat}&lng=${lng}`
  return isLocalhost(host)
    ? `http://localhost:${PORTS['reverse-geocode']}${queryParams}`
    : `https://${host}/api/reverse-geocode${queryParams}`
}

function isLocalhost(host) {
  return host.indexOf('localhost') !== -1
}
