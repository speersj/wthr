/**
 * Returns true for undefined, null, {}, or empty arrays
 * @param {any} obj
 */
export default function isEmpty(obj) {
  return (
    obj == undefined ||
    (obj.length && obj.length === 0) ||
    Object.values(obj).length === 0
  )
}
