import { uvColor } from "../../components/UVIndex";

describe("uvColor", () => {
  it("returns the correct color value from theme", () => {
    for (let i = 0; i <= 12; i++) {
      expect(uvColor(i)).toEqual({ color: `uvColor${i}` });
    }
  });

  it("returns uvColor for values < 0", () => {
    for (let i = 0; i >= -100; i--) {
      expect(uvColor(i)).toEqual({ color: "uvColor0" });
    }
  });

  it("returns uvColor12 for values > 12", () => {
    for (let i = 12; i <= 100; i++) {
      expect(uvColor(i)).toEqual({ color: "uvColor12" });
    }
  });
});
