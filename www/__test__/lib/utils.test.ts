import { capitalize, between } from "../../lib/utils";

describe("capitalize", () => {
  it("capitalizes the first character of a string", () => {
    expect(capitalize("justin")).toEqual("Justin");
  });

  it("if given an empty string, returns an empty string", () => {
    expect(capitalize("")).toEqual("");
  });
});

describe("between", () => {
  it("returns min if value passed is < min", () => {
    expect(between(-10, 0, 5)).toEqual(0);
  });

  it("returns max if value is > max", () => {
    expect(between(20, 0, 10)).toEqual(10);
  });

  it("returns value if it is between min and max", () => {
    expect(between(0, 0, 10)).toEqual(0);
    expect(between(-5, -10, 20)).toEqual(-5);
    expect(between(10, 0, 10)).toEqual(10);
    expect(between(5, 0, 10)).toEqual(5);
  });
});
