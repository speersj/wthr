import { uvColor } from "../../components/UVIndex";

describe("uvColor", () => {
  it("returns the correct color value from theme", () => {
    for (let i = 0; i <= 12; i++) {
      expect(uvColor(i)).toEqual({ color: `uvColor${i}` });
    }
  });

  it("returns uvColor for values < 0", () => {
    expect(uvColor(-1)).toEqual({ color: "uvColor0" });
  });

  it("returns uvColor0 for null/undefined", () => {
    expect(uvColor(null)).toEqual({ color: "uvColor0" });
    expect(uvColor()).toEqual({ color: "uvColor0" });
  });

  it("returns uvColor12 for values > 12", () => {
    expect(uvColor(13)).toEqual({ color: "uvColor12" });
  });
});
