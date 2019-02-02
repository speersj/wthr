/**
 * Returns true for undefined, null, {}, or empty arrays
 * @param {object} obj
 */
export function isEmpty(obj) {
  return (
    obj == undefined ||
    (obj.length && obj.length === 0) ||
    Object.values(obj).length === 0
  )
}

/**
 * Returns false for undefined, null, {}, or empty arrays
 * @param {obj} obj
 */
export const isNotEmpty = negate(isEmpty)

/**
 * Returns a function that will always return the opposite of its input function
 * when called.
 * @param {function} fn
 * @returns {function}
 */
export function negate(fn) {
  return function negated(...args) {
    return !fn(...args)
  }
}

/**
 * Capitalizes the first character of a string
 * @param {string} str
 * @returns {string} str with first letter capitalized
 */
export function capitalize(str) {
  if (typeof str !== 'string' || str.length === 0) return ''
  return str[0].toUpperCase() + str.slice(1)
}
