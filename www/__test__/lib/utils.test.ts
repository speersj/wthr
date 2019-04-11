import { capitalize, ensureWithin, isBetween } from "../../lib/utils";

describe("capitalize", () => {
  it("capitalizes the first character of a string", () => {
    expect(capitalize("justin")).toEqual("Justin");
  });

  it("if given an empty string, returns an empty string", () => {
    expect(capitalize("")).toEqual("");
  });
});

describe("ensureWithin", () => {
  it("returns min if value passed is < min", () => {
    expect(ensureWithin(-10, 0, 5)).toEqual(0);
  });

  it("returns max if value is > max", () => {
    expect(ensureWithin(20, 0, 10)).toEqual(10);
  });

  it("returns value if it is between min and max", () => {
    expect(ensureWithin(0, 0, 10)).toEqual(0);
    expect(ensureWithin(-5, -10, 20)).toEqual(-5);
    expect(ensureWithin(10, 0, 10)).toEqual(10);
    expect(ensureWithin(5, 0, 10)).toEqual(5);
  });
});

describe("isBetween", () => {
  it("returns true if value is between min/max inclusive", () => {
    const trueTestData = [
      [5, 0, 10],
      [0, 0, 10],
      [10, 0, 10],
      [-3, -5, 10],
      [-9, -20, -5],
      [-3, -3, 5],
    ];

    for (let data of trueTestData) {
      expect(isBetween(data[0], data[1], data[2])).toBeTruthy();
    }
  });

  it("returns false if valus is NOT between min/max inclusive", () => {
    const falseTestData = [
      [15, 0, 10],
      [-1, 0, 10],
      [100, 0, 10],
      [-30, -5, 10],
      [-900, -20, -5],
      [-12, -3, 5],
    ];

    for (let data of falseTestData) {
      expect(isBetween(data[0], data[1], data[2])).toBeFalsy();
    }
  });
});
