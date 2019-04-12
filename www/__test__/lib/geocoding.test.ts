import {
  convertBrowserCoordinates,
  browserCoordinates,
  isCloseEnough,
} from "../../lib/geocoding";

const mockCurrentPosition = (window as any).navigator.geolocation
  .mockCurrentPosition;

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
    mockCurrentPosition({ latitude: 90, longitude: 120 });
    const result = await browserCoordinates();
    expect(result).toEqual({ lat: 90, lng: 120 });
  });
});

describe("isCloseEnough", () => {
  it("is defined", () => {
    expect(isCloseEnough).toBeDefined();
  });

  it("returns false if coordinates are further than given distance", () => {
    const testValues = [
      {
        coordsA: { lat: 0.00001, lng: 0.0001 },
        coordsB: { lat: 0.00001, lng: 0.000001 },
        offset: 0,
      },
      {
        coordsA: { lat: 33.9, lng: 99.9 },
        coordsB: { lat: 33.9, lng: 100.1 },
        offset: 0.1,
      },
      {
        coordsA: { lat: 33.9, lng: 99.9 },
        coordsB: { lat: 33.9, lng: 33.78 },
        offset: 0.2,
      },
      {
        coordsA: { lat: 50, lng: -100 },
        coordsB: { lat: 49.91, lng: -100 },
        offset: 0.01,
      },
    ];

    for (let value of testValues) {
      const { coordsA, coordsB, offset } = value;
      expect(isCloseEnough(coordsA, coordsB, offset)).toBeFalsy();
    }
  });

  it("returns true if coordinates are within given distance", () => {
    const testValues = [
      {
        coordsA: { lat: 0, lng: 0 },
        coordsB: { lat: 0, lng: 0 },
        offset: 0,
      },
      {
        coordsA: { lat: 33.9, lng: 99.9 },
        coordsB: { lat: 33.9, lng: 100 },
        offset: 0.1,
      },
      {
        coordsA: { lat: 75, lng: 100 },
        coordsB: { lat: 75.12, lng: 99.85 },
        offset: 0.2,
      },
      {
        coordsA: { lat: -50, lng: 100 },
        coordsB: { lat: -49.992, lng: 100.001 },
        offset: 0.01,
      },
    ];

    for (let value of testValues) {
      const { coordsA, coordsB, offset } = value;
      expect(isCloseEnough(coordsA, coordsB, offset)).toBeTruthy();
    }
  });
});
