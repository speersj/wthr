/**
 * Capitalizes the first character of a string
 */
export function capitalize(str: string) {
  return str.length < 1 ? "" : str[0].toUpperCase() + str.slice(1);
}

export function between(value: number, min: number, max: number) {
  if (value >= min && value <= max) {
    return value;
  }

  return value < min ? min : max;
}
