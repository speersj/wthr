export const DEFAULTS = { lat: 45.572222, lng: -122.682624 }

/**
 *
 * @param {Object} browserLoc - object returned from browser geolocation API
 * @param {Object} browserLoc.coords - coordinates
 * @param {Number} browserLoc.coords.latitude - latitude
 * @param {Number} browserLoc.coords.longitude - longitude
 *
 * @returns {Object} { lat: Number, lng: Number }
 *
 */
export function convertBrowserCoordinates(browserLoc, defaults = DEFAULTS) {
  if (!browserLoc || !browserLoc.coords) return defaults

  return {
    lat: browserLoc.coords.latitude || DEFAULTS.lat,
    lng: browserLoc.coords.longitude || DEFAULTS.lng,
  }
}

/**
 *
 * @param {cbCoordinates} cb - callback that accepts an object: { lat, lng }
 * @param {Object} [defaults] - default coordinates (optional)
 * @param {Number} [defaults.lat] - default latitude
 * @param {Number} [defaults.lng] - default longitude
 *
 */
export function browserCoordinates(cb, defaults = DEFAULTS) {
  const fail = () => cb(defaults)
  const success = loc => cb(convertBrowserCoordinates(loc, defaults))

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, fail)
  } else {
    fail()
  }
}
