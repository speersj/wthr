import { toTime, toDate, toDayOfWeek } from "../../lib/dateTime";

describe("toTime", () => {
  it("takes a Unix timestamp and returns a value in the format HH:MM AM", () => {
    expect(toTime(1548430677)).toEqual("7:37 AM");
  });
});

describe("toDate", () => {
  it("takes a Unix timestamp and returns a date in the format of Jan 25, 2019", () => {
    expect(toDate(1548430677)).toEqual("Jan 25");
  });
});

describe("toDayOfWeek", () => {
  it("takes a Unix timestamp and outputs the day of the week", () => {
    expect(toDayOfWeek(1548316800)).toEqual("Thursday");
  });

  it("can display the abbreviation for a day of the week", () => {
    expect(toDayOfWeek(1548316800, true)).toEqual("Thurs");
  });
});
