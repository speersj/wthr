declare var global: any;

import {
  convertBrowserCoordinates,
  browserCoordinates,
} from "../../lib/geocoding";

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
  it("executes its callback function regardless", () => {
    const cb = jest.fn();
    browserCoordinates(cb);
    expect(cb).toHaveBeenCalled();
  });

  it("sets defaults if navigator.geolocation is not available", () => {
    const cb = jest.fn();
    const defaults = { lat: 45, lng: -122 };
    browserCoordinates(cb, defaults);
    expect(cb).toHaveBeenCalledWith(defaults);
  });

  it("executes the callback if navigator.geolocation is available", () => {
    const coords = { latitude: 45, longitude: -122 };
    const getCurrentPosition = jest
      .fn()
      .mockImplementationOnce(cb => Promise.resolve(cb({ coords })));

    global.navigator.geolocation = { getCurrentPosition }; // eslint-disable-line

    browserCoordinates(x => x);
    expect(getCurrentPosition).toHaveBeenCalled();
  });
});
