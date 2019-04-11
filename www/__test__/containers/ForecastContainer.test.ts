import mockedAxios from "axios";
import ForecastContainer from "../../containers/ForecastContainer";
import forecastData from "./forecastData";

function cacheToLocalStorage() {
  const data = JSON.stringify(forecastData());
  window.localStorage.setItem("forecast", data);
}

describe("ForecastContainer", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("is defined", () => {
    expect(ForecastContainer).toBeDefined();
    expect(new ForecastContainer()).toBeDefined();
  });

  describe("init", () => {
    it("sets the host name", async () => {
      const container = new ForecastContainer();
      await container.init("test.com");
      expect(container.state.hostName).toEqual("test.com");
    });

    it("loads previous data from localStorage if it is available", async () => {
      cacheToLocalStorage();
      const container = new ForecastContainer();
      await container.init("hostname");
      expect(container.isLoaded).toBeTruthy();
    });
  });

  describe("isLoaded", () => {
    it("returns false if data is not loaded", () => {
      expect(new ForecastContainer().isLoaded).toBeFalsy();
    });

    it("returns false if hostName is not set", () => {
      const container = new ForecastContainer();
      container.state.isLoaded = true;
      expect(container.isLoaded).toBeFalsy();
    });

    it("returns true if hostName is set and data is loaded", async () => {
      cacheToLocalStorage(); // init will load data from local storage if available
      const container = new ForecastContainer();
      await container.init("hostname");
      container.state.isLoaded = true;
      expect(container.isLoaded).toBeTruthy();
    });
  });

  describe("currently", () => {
    it("throws an error if no data is loaded", () => {
      expect(() => new ForecastContainer().currently).toThrowError(
        "Forecast data not loaded!",
      );
    });

    it("returns forecast.currently data", async () => {
      cacheToLocalStorage();
      const container = new ForecastContainer();
      await container.init("hostname");
      expect(container.currently).toEqual(forecastData().currently);
    });
  });

  describe("minutely", () => {
    it("throws an error if no data is loaded", () => {
      expect(() => new ForecastContainer().minutely).toThrowError(
        "Forecast data not loaded!",
      );
    });

    it("returns forecast.minutely data", async () => {
      cacheToLocalStorage();
      const container = new ForecastContainer();
      await container.init("hostname");
      expect(container.minutely).toEqual(forecastData().minutely);
    });
  });

  describe("daily", () => {
    it("throws an error if no data is loaded", () => {
      expect(() => new ForecastContainer().daily).toThrowError(
        "Forecast data not loaded!",
      );
    });

    it("returns forecast.daily data", async () => {
      cacheToLocalStorage();
      const container = new ForecastContainer();
      await container.init("hostname");
      expect(container.daily).toEqual(forecastData().daily);
    });
  });

  describe("load", () => {
    it("throws an error if hostname has not been set", async () => {
      expect.assertions(1);
      await expect(
        new ForecastContainer().load({ lat: 45, lng: -122 }),
      ).rejects.toThrowError("Host name not set in ForecastContainer!");
    });

    it("throws an error if darksky data is unavailble in region", async () => {
      const data = {
        ...forecastData(),
        flags: { "darksky-unavailable": true },
      };
      const container = new ForecastContainer();
      await container.init("hostname");
      (mockedAxios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ data }),
      );

      expect.assertions(1);
      await expect(container.load({ lat: 45, lng: 122 })).rejects.toThrowError(
        "API Reports forecast is currently unavailable for this area (darksky-unavailable)",
      );
    });

    it("loads data from API into state", async () => {
      const response = { data: forecastData() };
      const container = new ForecastContainer();
      await container.init("hostname");

      (mockedAxios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(response),
      );

      await container.load({ lat: 44.0521, lng: -123.0868 });
      expect(container.state.forecast).toEqual(response.data);
    });
  });
});
