import {
  convertBrowserCoordinates,
  browserCoordinates,
} from "../../lib/geocoding";
import { setGeoAPIMock, clearGeoAPIMock } from "./geoAPIMock";

describe("convertBrowserCoordinates", () => {
  it("converts browser location object to {lat, lng} format", () => {
    const browserLocation = { coords: { latitude: 45, longitude: -122 } };
    const results = convertBrowserCoordinates(browserLocation);

    expect(results).toBeDefined();
    expect(results.lat).toEqual(45);
    expect(results.lng).toEqual(-122);
  });
});

describe("browserCoordinates", () => {
  it("is defined", () => {
    expect(browserCoordinates).toBeDefined();
  });

  it("resolves with gps location", async () => {
    setGeoAPIMock({ latitude: 90, longitude: 120 });
    const result = await browserCoordinates();
    expect(result).toEqual({ lat: 90, lng: 120 });
    clearGeoAPIMock();
  });
});
