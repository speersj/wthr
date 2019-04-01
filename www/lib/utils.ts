/**
 * Capitalizes the first character of a string
 */
export function capitalize(str: string) {
  return str.length < 1 ? "" : str[0].toUpperCase() + str.slice(1);
}
