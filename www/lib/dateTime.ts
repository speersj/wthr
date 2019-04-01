import { DateTime } from "luxon";

/**
 * Convert Unix timestamp to human readable time ex '7:37 AM'
 */
export function toTime(unixTime: number) {
  return DateTime.fromSeconds(unixTime).toLocaleString(DateTime.TIME_SIMPLE);
}

/**
 * Convert Unix timestamp to human readable date ex Oct 14
 */
export function toDate(unixTime: number) {
  return DateTime.fromSeconds(unixTime)
    .toLocaleString(DateTime.DATE_MED)
    .split(",")[0];
}

/**
 * Convert Unix timestamp to day of week, ex Friday or Fri
 */
export function toDayOfWeek(unixTime: number, abbrev = false) {
  const day = DateTime.fromSeconds(unixTime)
    .toLocaleString(DateTime.DATE_HUGE)
    .split(",")[0];

  return abbrev ? abbreviateDay(day) : day;
}

function abbreviateDay(dayOfWeek: string) {
  const abbrevs: { [index: string]: string } = {
    Monday: "Mon",
    Tuesday: "Tues",
    Wednesday: "Weds",
    Thursday: "Thurs",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  };

  return abbrevs[dayOfWeek] || "";
}
