import { capitalize } from "../../lib/utils";

describe("capitalize", () => {
  it("capitalizes the first character of a string", () => {
    expect(capitalize("justin")).toEqual("Justin");
  });

  it("if given an empty string, returns an empty string", () => {
    expect(capitalize("")).toEqual("");
  });
});
