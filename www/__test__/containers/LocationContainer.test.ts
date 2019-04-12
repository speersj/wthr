import mockedAxios from "axios";
import LocationContainer, {
  getDefaults,
} from "../../containers/LocationContainer";
import { lchmod } from "fs";

const mockCurrentPosition = (window as any).navigator.geolocation
  .mockCurrentPosition;

describe("LocationContainer", () => {
  it("is defined", () => {
    expect(LocationContainer).toBeDefined();
    expect(new LocationContainer()).toBeDefined();
  });

  describe("init", () => {
    it("sets the host name", async () => {
      const container = new LocationContainer();
      await container.init("test.com");
      expect(container.state.hostName).toEqual("test.com");
    });

    it("loads location from localStorage cache", async () => {
      window.localStorage.setItem(
        "location",
        JSON.stringify({
          name: "Portland",
          coords: { lat: 45, lng: -122 },
        }),
      );

      const container = new LocationContainer();
      await container.init("test.com");
      expect(container.state.name).toEqual("Portland");
      expect(container.state.coords).toEqual({ lat: 45, lng: -122 });
    });

    it("sets default location upon instantiation", () => {
      const defaults = getDefaults();
      expect(new LocationContainer().state.name).toEqual(defaults.name);
      expect(new LocationContainer().state.coords).toEqual(defaults.coords);
    });
  });

  describe("isReady", () => {
    it("returns false if hostName has not been set", () => {
      expect(new LocationContainer().isReady).toBeFalsy();
    });

    it("returns true if hostName has been set", async () => {
      const lc = new LocationContainer();
      await lc.init("hostname");
      expect(lc.isReady).toBeTruthy();
    });
  });

  describe("coords", () => {
    it("returns coordinates", () => {
      const container = new LocationContainer();
      container.state.coords = { lat: 45, lng: -122 };
      expect(container.coords).toEqual({ lat: 45, lng: -122 });
    });
  });

  describe("locationName", () => {
    it("returns human-readable name of location", () => {
      const container = new LocationContainer();
      container.state.name = "Eugene, Oregon";
      expect(container.locationName).toEqual("Eugene, Oregon");
    });
  });

  describe("loadCurrentLocation", () => {
    beforeEach(() => {
      window.localStorage.clear();
    });

    it("loads browser GPS and reverse geocodes results to get location name", async () => {
      mockCurrentPosition({ latitude: 30, longitude: 60 });
      const data = mockReverseGeocodeData();
      (mockedAxios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ data }),
      );
      const container = new LocationContainer();
      container.init("hostname");
      await container.loadCurrentLocation();

      expect(container.coords).toEqual({ lat: 30, lng: 60 });
      expect(container.locationName).toEqual("Corvallis, Oregon");
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://hostname/api/reverse-geocode?lat=30&lng=60",
      );
    });

    it("does not update state if gps location is close enough to current state", async () => {
      const lc = new LocationContainer();
      lc.init("hostname");
      await lc.setState((prevState) => ({
        ...prevState,
        coords: { lat: 45, lng: 90 },
      }));
      mockCurrentPosition({ latitude: 45.001, longitude: 90.0001 });
      await lc.loadCurrentLocation();
      expect(lc.state.coords).toEqual({ lat: 45, lng: 90 });
    });

    it("updates state even if close enough when force = true", async () => {
      const lc = new LocationContainer();
      lc.init("hostname");
      await lc.setState((prevState) => ({
        ...prevState,
        coords: { lat: 45, lng: 90 },
      }));
      mockCurrentPosition({ latitude: 45.001, longitude: 90.0001 });
      await lc.loadCurrentLocation(true);
      expect(lc.state.coords).toEqual({ lat: 45.001, lng: 90.0001 });
    });
  });

  describe("setLocation", () => {
    it("sets coordinates", async () => {
      const container = new LocationContainer();
      await container.setLocation({ lat: 45, lng: 90 });
      expect(container.coords).toEqual({ lat: 45, lng: 90 });
    });

    it("sets the location name", async () => {
      const lc = new LocationContainer();
      await lc.setLocation({ lat: 45, lng: 90 }, "Utopia");
      expect(lc.locationName).toEqual("Utopia");
    });

    it("sets the location name as 'Unknown' if reverse geocoding fails", async () => {
      const container = new LocationContainer();
      await container.setLocation({ lat: 45, lng: 90 });
      expect(container.locationName).toEqual("Unknown");
    });

    it("sets the location name using reverse-geocode api", async () => {
      const data = mockReverseGeocodeData();
      (mockedAxios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ data }),
      );
      const container = new LocationContainer();
      await container.init("hostname");
      await container.setLocation({ lat: 45, lng: 99 });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://hostname/api/reverse-geocode?lat=45&lng=99",
      );
      expect(container.locationName).toEqual("Corvallis, Oregon");
    });

    it("uses the county name if city is not returned from api", async () => {
      const data = mockReverseGeocodeData();
      delete data.address.city;
      (mockedAxios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ data }),
      );
      const container = new LocationContainer();
      await container.init("hostname");
      await container.setLocation({ lat: 45, lng: 99 });

      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://hostname/api/reverse-geocode?lat=45&lng=99",
      );
      expect(container.locationName).toEqual("Benton County, Oregon");
    });
  });
});

// // sample response data from LocationIQ
function mockReverseGeocodeData() {
  return {
    place_id: "331243605871",
    osm_type: "way",
    osm_id: "20360349",
    licence:
      "© LocationIQ.com CC BY 4.0, Data © OpenStreetMap contributors, ODbL 1.0",
    lat: "44.564656",
    lon: "-123.262042",
    display_name:
      "Monroe Avenue, Corvallis, Benton County, Oregon, United States",
    boundingbox: ["44.563835", "44.565998", "-123.267281", "-123.258805"],
    importance: 0.225,
    address: {
      road: "Monroe Avenue",
      city: "Corvallis",
      county: "Benton County",
      state: "Oregon",
      country: "United States",
      country_code: "us",
      postcode: "97330",
    },
  };
}
