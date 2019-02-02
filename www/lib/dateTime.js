import { DateTime } from 'luxon'

/**
 * Convert Unix timestamp to human readable time ex '7:37 AM'
 * @param {number} unixTime - Timestamp in seconds since Unix epoch
 * @returns {string}
 */
export function toTime(unixTime) {
  return DateTime.fromSeconds(unixTime).toLocaleString(DateTime.TIME_SIMPLE)
}

/**
 * Convert Unix timestamp to human readable date ex Oct 14
 * @param {number} unixTime - Timestamp in seconds since Unix epoch
 * @returns {string}
 */
export function toDate(unixTime) {
  return DateTime.fromSeconds(unixTime)
    .toLocaleString(DateTime.DATE_MED)
    .split(',')[0]
}

/**
 * Convert Unix timestamp to day of week, ex Friday or Fri
 * @param {number} unixTime - Timestamp in seconds since Unix epoch
 * @param {boolean} abbrev - if True, day of week is abbreviated ex Fri
 * @returns {string}
 */
export function toDayOfWeek(unixTime, abbrev = false) {
  const day = DateTime.fromSeconds(unixTime)
    .toLocaleString(DateTime.DATE_HUGE)
    .split(',')[0]
  return abbrev ? abbreviateDay(day) : day
}

function abbreviateDay(dayOfWeek) {
  return {
    Monday: 'Mon',
    Tuesday: 'Tues',
    Wednesday: 'Weds',
    Thursday: 'Thurs',
    Friday: 'Fri',
    Saturday: 'Sat',
    Sunday: 'Sun',
  }[dayOfWeek]
}
