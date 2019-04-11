/**
 * Capitalizes the first character of a string
 */
export function capitalize(str: string) {
  return str.length < 1 ? "" : str[0].toUpperCase() + str.slice(1);
}

/**
 * given a value, returns a value between min and max, inclusive
 * if value is less than min, min is returned
 * if value is greater than max, max is returned
 * if value is within that range, value is returned
 */
export function ensureWithin(value: number, min: number, max: number) {
  if (value >= min && value <= max) {
    return value;
  }

  return value < min ? min : max;
}

/**
 * returns true if value is between min & max, inclusive; false otherwise
 */
export function isBetween(value: number, min: number, max: number) {
  return value >= min && value <= max;
}
